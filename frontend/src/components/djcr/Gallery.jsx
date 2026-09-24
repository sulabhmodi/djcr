import { useEffect, useState } from "react";
import axios from "axios";
import { ImagePlus, FileText, Download, Images } from "lucide-react";
import { toast } from "sonner";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { EVENTS } from "./eventsData";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EMPTY = { category: "gallery", title: "", event_id: "", file: null };

const fmtSize = (n) =>
    n >= 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;

export default function Gallery() {
    const [tab, setTab] = useState("photos");
    const [files, setFiles] = useState([]);
    const [available, setAvailable] = useState(true);
    const [loading, setLoading] = useState(true);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [form, setForm] = useState(EMPTY);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        axios
            .get(`${API}/media`, { timeout: 4000 })
            .then((res) => {
                setFiles(res.data.files || []);
                setAvailable(true);
            })
            .catch(() => setAvailable(false))
            .finally(() => setLoading(false));
    }, []);

    const photos = files.filter((f) => f.category !== "document");
    const docs = files.filter((f) => f.category === "document");

    const openUpload = (category) => {
        setForm({ ...EMPTY, category });
        setUploadOpen(true);
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!form.file) {
            toast.error("Please choose a file first.");
            return;
        }
        setSubmitting(true);
        try {
            const fd = new FormData();
            fd.append("file", form.file);
            fd.append("category", form.category);
            fd.append("title", form.title);
            fd.append("event_id", form.event_id);
            const res = await axios.post(`${API}/media/upload`, fd);
            setFiles((prev) => [res.data.file, ...prev]);
            toast.success("Jai Jinendra! Your upload has been received.");
            setUploadOpen(false);
            setForm(EMPTY);
        } catch (err) {
            toast.error(err?.response?.data?.detail || "Upload failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="gallery" data-testid="gallery-section" className="py-20 md:py-32 bg-[#F4EBD9]/60">
            <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
                <SectionHeading
                    chapter="06"
                    eyebrow="Sangh Moments"
                    title="Gallery & Resources"
                    subtitle="Photos from our gatherings and downloadable resources for the Sangh — temple brochures, pathshala materials, and forms."
                />

                <Reveal delay={0.2} className="mt-10 flex justify-center">
                    <div className="inline-flex rounded-full border border-[#6F1D1B]/15 bg-[#FFFDF7] p-1">
                        {[
                            { id: "photos", label: "Photos", icon: Images },
                            { id: "documents", label: "Documents", icon: FileText },
                        ].map((t) => (
                            <button
                                key={t.id}
                                data-testid={`gallery-tab-${t.id}`}
                                onClick={() => setTab(t.id)}
                                className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs uppercase tracking-[0.16em] transition-colors duration-300 ${
                                    tab === t.id
                                        ? "bg-[#6F1D1B] text-[#FFF9ED]"
                                        : "text-[#6F1D1B]/70 hover:text-[#6F1D1B]"
                                }`}
                            >
                                <t.icon size={15} />
                                {t.label}
                            </button>
                        ))}
                    </div>
                </Reveal>

                {!loading && !available && (
                    <Reveal className="mt-12">
                        <p
                            data-testid="gallery-unavailable"
                            className="text-center text-[#292929]/60 max-w-xl mx-auto"
                        >
                            Our gallery is hosted on the DJCR community server and will appear here
                            soon. Please check back.
                        </p>
                    </Reveal>
                )}

                {!loading && available && tab === "photos" && (
                    <div className="mt-12">
                        {photos.length === 0 ? (
                            <Reveal className="text-center">
                                <p
                                    data-testid="gallery-empty"
                                    className="text-[#292929]/60 max-w-md mx-auto"
                                >
                                    No photos yet — be the first to share a Sangh moment.
                                </p>
                            </Reveal>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {photos.map((f) => (
                                    <Reveal key={f.id}>
                                        <figure
                                            data-testid={`gallery-photo-${f.id}`}
                                            className="group rounded-2xl overflow-hidden border border-[#6F1D1B]/10 bg-[#FFFDF7] hover:border-[#C99A30]/50 hover:shadow-[0_30px_50px_-25px_rgba(111,29,27,0.25)] transition-all duration-500"
                                        >
                                            <img
                                                src={`${API}/media/file/${f.id}`}
                                                alt={f.title || "DJCR community photo"}
                                                loading="lazy"
                                                className="w-full h-64 object-cover group-hover:scale-[1.03] transition-transform duration-[1.4s] ease-out"
                                            />
                                            {f.title && (
                                                <figcaption className="px-5 py-3 text-sm text-[#292929]/70">
                                                    {f.title}
                                                </figcaption>
                                            )}
                                        </figure>
                                    </Reveal>
                                ))}
                            </div>
                        )}
                        <Reveal delay={0.15} className="mt-10 text-center">
                            <button
                                data-testid="gallery-upload-photo-button"
                                onClick={() => openUpload("gallery")}
                                className="btn-shimmer inline-flex items-center gap-2.5 rounded-full bg-[#6F1D1B] text-[#FFF9ED] px-8 py-3.5 text-sm uppercase tracking-[0.16em] hover:bg-[#521413] transition-colors duration-300"
                            >
                                <ImagePlus size={17} />
                                Share a Photo
                            </button>
                        </Reveal>
                    </div>
                )}

                {!loading && available && tab === "documents" && (
                    <div className="mt-12 max-w-3xl mx-auto">
                        {docs.length === 0 ? (
                            <Reveal className="text-center">
                                <p data-testid="documents-empty" className="text-[#292929]/60">
                                    No documents yet — temple brochures, pathshala materials, and
                                    forms will appear here.
                                </p>
                            </Reveal>
                        ) : (
                            <ul className="space-y-4">
                                {docs.map((f) => (
                                    <Reveal key={f.id}>
                                        <li
                                            data-testid={`document-row-${f.id}`}
                                            className="flex items-center gap-4 rounded-2xl border border-[#6F1D1B]/10 bg-[#FFFDF7] px-6 py-5 hover:border-[#C99A30]/50 transition-colors duration-300"
                                        >
                                            <span className="w-11 h-11 rounded-full border border-[#C99A30]/40 flex items-center justify-center text-[#6F1D1B] shrink-0">
                                                <FileText size={19} strokeWidth={1.5} />
                                            </span>
                                            <span className="flex-1 min-w-0">
                                                <span className="block font-display text-lg text-[#6F1D1B] truncate">
                                                    {f.title}
                                                </span>
                                                <span className="block text-xs text-[#292929]/50 mt-0.5">
                                                    PDF · {fmtSize(f.size)}
                                                </span>
                                            </span>
                                            <a
                                                data-testid={`document-download-${f.id}`}
                                                href={`${API}/media/file/${f.id}?download=1`}
                                                className="inline-flex items-center gap-2 rounded-full border border-[#6F1D1B]/30 text-[#6F1D1B] px-5 py-2 text-xs uppercase tracking-[0.14em] hover:bg-[#6F1D1B] hover:text-[#FFF9ED] transition-colors duration-300"
                                            >
                                                <Download size={14} />
                                                Download
                                            </a>
                                        </li>
                                    </Reveal>
                                ))}
                            </ul>
                        )}
                        <Reveal delay={0.15} className="mt-10 text-center">
                            <button
                                data-testid="gallery-upload-document-button"
                                onClick={() => openUpload("document")}
                                className="btn-shimmer inline-flex items-center gap-2.5 rounded-full border border-[#6F1D1B]/35 text-[#6F1D1B] px-8 py-3.5 text-sm uppercase tracking-[0.16em] hover:border-[#C99A30] hover:bg-[#C99A30]/10 transition-colors duration-300"
                            >
                                <FileText size={17} />
                                Share a Document (PDF)
                            </button>
                        </Reveal>
                    </div>
                )}
            </div>

            <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                <DialogContent
                    data-testid="media-upload-dialog"
                    className="bg-[#FFFDF7] border-[#C99A30]/40 sm:max-w-md"
                >
                    <DialogHeader>
                        <DialogTitle className="font-display text-2xl text-[#6F1D1B]">
                            Share With the Sangh
                        </DialogTitle>
                        <DialogDescription className="text-[#292929]/60">
                            Upload a photo (JPG, PNG, WEBP, GIF) or a PDF document — max 15 MB.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-4 mt-2">
                        <select
                            data-testid="upload-category"
                            value={form.category}
                            onChange={(e) =>
                                setForm({ ...form, category: e.target.value, event_id: "", file: null })
                            }
                            className="w-full rounded-lg border border-[#6F1D1B]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#C99A30]"
                        >
                            <option value="gallery">Gallery Photo</option>
                            <option value="event">Event Photo</option>
                            <option value="document">Document (PDF)</option>
                        </select>
                        {form.category === "event" && (
                            <select
                                data-testid="upload-event"
                                required
                                value={form.event_id}
                                onChange={(e) => setForm({ ...form, event_id: e.target.value })}
                                className="w-full rounded-lg border border-[#6F1D1B]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#C99A30]"
                            >
                                <option value="">Choose an event…</option>
                                {EVENTS.map((ev) => (
                                    <option key={ev.id} value={ev.id}>
                                        {ev.title}
                                    </option>
                                ))}
                            </select>
                        )}
                        <input
                            data-testid="upload-title"
                            placeholder="Title / caption (optional)"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full rounded-lg border border-[#6F1D1B]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#C99A30] focus:ring-2 focus:ring-[#C99A30]/20"
                        />
                        <input
                            data-testid="upload-file-input"
                            type="file"
                            required
                            accept={form.category === "document" ? "application/pdf" : "image/*"}
                            onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })}
                            className="w-full rounded-lg border border-[#6F1D1B]/20 bg-white px-4 py-2.5 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[#6F1D1B] file:text-[#FFF9ED] file:px-4 file:py-1.5 file:text-xs file:uppercase file:tracking-wider"
                        />
                        <button
                            data-testid="upload-submit"
                            type="submit"
                            disabled={submitting}
                            className="btn-shimmer w-full rounded-full bg-[#6F1D1B] text-[#FFF9ED] py-3 text-sm uppercase tracking-[0.16em] hover:bg-[#521413] transition-colors duration-300 disabled:opacity-60"
                        >
                            {submitting ? "Uploading…" : "Upload"}
                        </button>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
