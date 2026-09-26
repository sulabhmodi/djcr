import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, Pencil, Trash2, Plus, Youtube, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import Logo from "./Logo";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CATEGORIES = ["Parv", "Swadhyay", "Pathshala", "Puja", "Community", "Live Stream"];

const EMPTY = {
    title: "",
    category: "Community",
    date: "",
    time: "To be announced",
    location: "Raleigh–RTP Area • Venue to be announced",
    description: "",
    tentative: true,
    youtube_url: "",
    media_id: "",
    media_type: "",
};

function fmtErr(detail) {
    if (detail == null) return "Something went wrong. Please try again.";
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail))
        return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).join(" ");
    return String(detail);
}

export default function Admin() {
    const [token, setToken] = useState(localStorage.getItem("djcr_admin_token") || "");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState(EMPTY);
    const [editing, setEditing] = useState(null);
    const [busy, setBusy] = useState(false);
    const [uploading, setUploading] = useState(false);

    const auth = { headers: { Authorization: `Bearer ${token}` } };

    const load = () =>
        axios
            .get(`${API}/admin/events`, auth)
            .then((r) => setEvents(r.data.events || []))
            .catch((e) => {
                if (e.response?.status === 401) {
                    localStorage.removeItem("djcr_admin_token");
                    setToken("");
                }
            });

    useEffect(() => {
        if (token) load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const login = async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
            const r = await axios.post(`${API}/admin/login`, { email, password });
            localStorage.setItem("djcr_admin_token", r.data.token);
            setToken(r.data.token);
            toast.success("Jai Jinendra — welcome, Admin.");
        } catch (err) {
            toast.error(fmtErr(err.response?.data?.detail));
        } finally {
            setBusy(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("djcr_admin_token");
        setToken("");
    };

    const uploadMedia = async (file) => {
        if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append("file", file);
            fd.append("category", "event");
            fd.append("title", form.title || file.name);
            const r = await axios.post(`${API}/media/upload`, fd);
            setForm((f) => ({
                ...f,
                media_id: r.data.file.id,
                media_type: r.data.file.content_type.startsWith("video") ? "video" : "image",
            }));
            toast.success("Media uploaded and attached to this event.");
        } catch (err) {
            toast.error(fmtErr(err.response?.data?.detail));
        } finally {
            setUploading(false);
        }
    };

    const save = async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
            if (editing) {
                await axios.put(`${API}/admin/events/${editing}`, form, auth);
                toast.success("Event updated.");
            } else {
                await axios.post(`${API}/admin/events`, form, auth);
                toast.success("Event created.");
            }
            setForm(EMPTY);
            setEditing(null);
            load();
        } catch (err) {
            toast.error(fmtErr(err.response?.data?.detail));
        } finally {
            setBusy(false);
        }
    };

    const remove = async (id, title) => {
        if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
        try {
            await axios.delete(`${API}/admin/events/${id}`, auth);
            toast.success("Event deleted.");
            load();
        } catch (err) {
            toast.error(fmtErr(err.response?.data?.detail));
        }
    };

    const startEdit = (ev) => {
        setEditing(ev.id);
        setForm({
            title: ev.title || "",
            category: ev.category || "Community",
            date: ev.date || "",
            time: ev.time || "",
            location: ev.location || "",
            description: ev.description || "",
            tentative: !!ev.tentative,
            youtube_url: ev.youtube_url || "",
            media_id: ev.media_id || "",
            media_type: ev.media_type || "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const field =
        "w-full rounded-lg border border-[#6F1D1B]/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#C99A30] focus:ring-2 focus:ring-[#C99A30]/20";

    if (!token) {
        return (
            <div className="min-h-screen bg-[#FFF9ED] jali-bg flex items-center justify-center px-4">
                <div className="w-full max-w-sm rounded-2xl bg-[#FFFDF7] border border-[#C99A30]/40 p-8 shadow-[0_30px_60px_-30px_rgba(111,29,27,0.35)]">
                    <div className="flex justify-center">
                        <Logo />
                    </div>
                    <h1 className="mt-6 text-center font-display text-2xl text-[#6F1D1B]">Admin Login</h1>
                    <p className="mt-1 text-center text-xs text-[#292929]/55">
                        Manage DJCR events, photos, and live links
                    </p>
                    <form onSubmit={login} className="mt-6 space-y-4">
                        <input
                            data-testid="admin-login-email"
                            type="email"
                            required
                            placeholder="Admin email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={field}
                        />
                        <input
                            data-testid="admin-login-password"
                            type="password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={field}
                        />
                        <button
                            data-testid="admin-login-submit"
                            type="submit"
                            disabled={busy}
                            className="btn-shimmer w-full rounded-full bg-[#6F1D1B] text-[#FFF9ED] py-3 text-sm uppercase tracking-[0.16em] hover:bg-[#521413] transition-colors duration-300 disabled:opacity-60"
                        >
                            {busy ? "Signing in…" : "Sign In"}
                        </button>
                    </form>
                    <a
                        href="/"
                        data-testid="admin-back-link"
                        className="mt-5 block text-center text-xs text-[#6F1D1B]/60 hover:text-[#C99A30]"
                    >
                        ← Back to website
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFF9ED] jali-bg">
            <div className="bg-[#521413] border-b border-[#C99A30]/25">
                <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
                    <Logo dark />
                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            data-testid="admin-view-site"
                            className="text-xs uppercase tracking-[0.14em] text-[#FFF9ED]/70 hover:text-[#C99A30]"
                        >
                            View Site
                        </a>
                        <button
                            data-testid="admin-logout"
                            onClick={logout}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#C99A30]/40 text-[#C99A30] px-4 py-1.5 text-xs uppercase tracking-[0.14em] hover:bg-[#C99A30]/10"
                        >
                            <LogOut size={13} /> Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 grid lg:grid-cols-2 gap-10">
                <div>
                    <h2 className="font-display text-2xl text-[#6F1D1B]">
                        {editing ? "Edit Event" : "Create Event"}
                    </h2>
                    <p className="mt-1 text-xs text-[#292929]/55">
                        Add daily events with a write-up, a photo or video, and an optional YouTube
                        live link.
                    </p>
                    <form data-testid="admin-event-form" onSubmit={save} className="mt-5 space-y-4">
                        <input
                            data-testid="admin-event-title"
                            required
                            placeholder="Event title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className={field}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <select
                                data-testid="admin-event-category"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className={field}
                            >
                                {CATEGORIES.map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                            <input
                                data-testid="admin-event-date"
                                required
                                placeholder="Date (e.g. Sept 20, 2026)"
                                value={form.date}
                                onChange={(e) => setForm({ ...form, date: e.target.value })}
                                className={field}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                data-testid="admin-event-time"
                                placeholder="Time"
                                value={form.time}
                                onChange={(e) => setForm({ ...form, time: e.target.value })}
                                className={field}
                            />
                            <input
                                data-testid="admin-event-location"
                                placeholder="Location"
                                value={form.location}
                                onChange={(e) => setForm({ ...form, location: e.target.value })}
                                className={field}
                            />
                        </div>
                        <textarea
                            data-testid="admin-event-description"
                            rows="4"
                            placeholder="Write about this event…"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className={field}
                        />
                        <div className="relative">
                            <Youtube size={16} className="absolute left-4 top-3 text-[#C99A30]" />
                            <input
                                data-testid="admin-event-youtube"
                                type="url"
                                placeholder="YouTube live link (optional) — https://youtube.com/…"
                                value={form.youtube_url}
                                onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
                                className={`${field} pl-10`}
                            />
                        </div>
                        <label className="flex items-center gap-2.5 text-sm text-[#292929]/70">
                            <input
                                data-testid="admin-event-tentative"
                                type="checkbox"
                                checked={form.tentative}
                                onChange={(e) => setForm({ ...form, tentative: e.target.checked })}
                                className="accent-[#6F1D1B]"
                            />
                            Mark as "Details to be confirmed"
                        </label>
                        <div className="rounded-xl border border-dashed border-[#C99A30]/50 bg-[#FFF9ED]/60 p-4">
                            {form.media_id ? (
                                <div className="flex items-center gap-4">
                                    {form.media_type === "video" ? (
                                        <video
                                            data-testid="admin-media-preview"
                                            src={`${API}/media/file/${form.media_id}`}
                                            className="h-20 w-28 rounded-lg object-cover border border-[#C99A30]/30"
                                            muted
                                        />
                                    ) : (
                                        <img
                                            data-testid="admin-media-preview"
                                            src={`${API}/media/file/${form.media_id}`}
                                            alt="Event media"
                                            className="h-20 w-28 rounded-lg object-cover border border-[#C99A30]/30"
                                        />
                                    )}
                                    <button
                                        type="button"
                                        data-testid="admin-media-remove"
                                        onClick={() => setForm({ ...form, media_id: "", media_type: "" })}
                                        className="text-xs text-[#6F1D1B]/60 hover:text-[#E87524] underline underline-offset-2"
                                    >
                                        Remove media
                                    </button>
                                </div>
                            ) : (
                                <label className="flex items-center gap-3 cursor-pointer text-sm text-[#292929]/60">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-[#6F1D1B] text-[#FFF9ED] px-4 py-2 text-xs uppercase tracking-[0.14em]">
                                        <ImagePlus size={14} />
                                        {uploading ? "Uploading…" : "Add Photo / Video"}
                                    </span>
                                    <input
                                        data-testid="admin-event-media"
                                        type="file"
                                        accept="image/*,video/mp4,video/webm"
                                        className="hidden"
                                        onChange={(e) => uploadMedia(e.target.files?.[0])}
                                    />
                                    <span className="text-xs">JPG, PNG, WEBP, GIF or MP4 — max 60 MB</span>
                                </label>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <button
                                data-testid="admin-event-save"
                                type="submit"
                                disabled={busy || uploading}
                                className="btn-shimmer flex-1 rounded-full bg-[#6F1D1B] text-[#FFF9ED] py-3 text-sm uppercase tracking-[0.16em] hover:bg-[#521413] transition-colors duration-300 disabled:opacity-60"
                            >
                                {busy ? "Saving…" : editing ? "Update Event" : "Create Event"}
                            </button>
                            {editing && (
                                <button
                                    type="button"
                                    data-testid="admin-event-cancel"
                                    onClick={() => {
                                        setEditing(null);
                                        setForm(EMPTY);
                                    }}
                                    className="rounded-full border border-[#6F1D1B]/30 text-[#6F1D1B] px-6 text-sm uppercase tracking-[0.14em]"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div>
                    <h2 className="font-display text-2xl text-[#6F1D1B] flex items-center gap-2">
                        Current Events
                        <span className="text-xs font-mono text-[#C99A30] tracking-[0.2em]">
                            {events.length} LIVE
                        </span>
                    </h2>
                    <ul data-testid="admin-event-list" className="mt-5 space-y-4">
                        {events.map((ev) => (
                            <li
                                key={ev.id}
                                data-testid={`admin-event-row-${ev.id}`}
                                className="rounded-2xl border border-[#6F1D1B]/10 bg-[#FFFDF7] p-5"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="font-display text-lg text-[#6F1D1B] truncate">
                                            {ev.title}
                                        </p>
                                        <p className="text-xs text-[#292929]/55 mt-0.5">
                                            {ev.category} · {ev.date} · {ev.time}
                                        </p>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {ev.youtube_url && (
                                                <span className="rounded-full bg-[#E87524]/10 border border-[#E87524]/30 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-[#c85a10]">
                                                    YouTube Live
                                                </span>
                                            )}
                                            {ev.media_id && (
                                                <span className="rounded-full bg-[#C99A30]/10 border border-[#C99A30]/30 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-[#8a6d1f]">
                                                    {ev.media_type === "video" ? "Video" : "Photo"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            data-testid={`admin-event-edit-${ev.id}`}
                                            onClick={() => startEdit(ev)}
                                            className="w-9 h-9 rounded-full border border-[#6F1D1B]/20 flex items-center justify-center text-[#6F1D1B] hover:bg-[#6F1D1B] hover:text-[#FFF9ED] transition-colors"
                                            aria-label={`Edit ${ev.title}`}
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            data-testid={`admin-event-delete-${ev.id}`}
                                            onClick={() => remove(ev.id, ev.title)}
                                            className="w-9 h-9 rounded-full border border-[#6F1D1B]/20 flex items-center justify-center text-[#6F1D1B] hover:bg-[#E87524] hover:border-[#E87524] hover:text-[#FFF9ED] transition-colors"
                                            aria-label={`Delete ${ev.title}`}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                        {events.length === 0 && (
                            <li className="text-sm text-[#292929]/55">
                                No events yet — create your first one.
                            </li>
                        )}
                    </ul>
                    <a
                        href="/#events"
                        data-testid="admin-preview-events"
                        className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#6F1D1B]/60 hover:text-[#C99A30]"
                    >
                        <Plus size={13} /> Preview how events look on the site
                    </a>
                </div>
            </div>
        </div>
    );
}
