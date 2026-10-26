/**
 * LOCKET WIDGET WEB APPLICATION
 * Powered by Locket CDN & iOS Device Emulation
 */

// --- AUDIO SYNTHESIZER (Web Audio API) ---
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playShutter() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(320, now);
    osc1.frequency.exponentialRampToValueAtTime(80, now + 0.04);
    gain1.gain.setValueAtTime(0.5, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.04);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(260, now + 0.06);
    osc2.frequency.exponentialRampToValueAtTime(60, now + 0.12);
    gain2.gain.setValueAtTime(0.6, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.06);
    osc2.stop(now + 0.12);
  }

  playSendWhoosh() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.28);
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600 + Math.random() * 200, now);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.1);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playGoldChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    });
  }
}

const sfx = new SoundEffects();

// --- CDN & VIDEO STREAM URL NORMALIZERS ---
function toCdnUrl(url) {
  if (!url || typeof url !== 'string') return url;
  // Convert firebase storage url to cdn.locketcamera.com
  return url.replace(/https?:\/\/firebasestorage\.googleapis\.com(:443)?/, 'https://cdn.locketcamera.com');
}

function toVideoStreamUrl(url) {
  if (!url || typeof url !== 'string') return url;
  // Direct link straight to high-speed Locket CDN (no local proxy delay)
  return toCdnUrl(url);
}

function handleVideoError(vid) {
  const original = vid.getAttribute('data-original-url') || vid.src;
  if (!vid.getAttribute('data-fallback-attempted') && original && original.includes('cdn.locketcamera.com')) {
    vid.setAttribute('data-fallback-attempted', 'true');
    // Fall back directly to Firebase Storage origin
    vid.src = original.replace('cdn.locketcamera.com', 'firebasestorage.googleapis.com');
    vid.load();
    vid.play().catch(() => {});
  }
}

function handleImageError(img) {
  const original = img.getAttribute('data-original-url') || img.src;
  if (!img.getAttribute('data-fallback-attempted') && original && original.includes('cdn.locketcamera.com')) {
    img.setAttribute('data-fallback-attempted', 'true');
    // Fall back directly to Firebase Storage origin
    img.src = original.replace('cdn.locketcamera.com', 'firebasestorage.googleapis.com');
    return;
  }
  img.src = AESTHETIC_PRESETS[0];
}

// --- AESTHETIC MOMENTS PRESETS ---
const AESTHETIC_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=80'
];

const DEFAULT_FRIENDS = [
  { id: 'f1', name: 'Maya Chen', username: 'mayachen', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', streak: 24, lastActive: '2m ago' },
  { id: 'f2', name: 'Liam Vance', username: 'liam_v', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', streak: 15, lastActive: '15m ago' },
  { id: 'f3', name: 'Chloe Kim', username: 'chloekim', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80', streak: 8, lastActive: '1h ago' },
  { id: 'f4', name: 'Sam Rivera', username: 'sam_rivera', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80', streak: 5, lastActive: '3h ago' }
];

const DEFAULT_LOCKETS = [
  {
    id: 'm1',
    canonical_uid: 'm1',
    sender: { name: 'Maya Chen', username: 'mayachen', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    caption: 'morning coffee before class ☕️',
    musicBadge: 'Billie Eilish • BIRDS OF A FEATHER',
    timestamp: '4m ago',
    reactions: { '❤️': 3, '🔥': 2, '😂': 0, '😮': 1 }
  },
  {
    id: 'm2',
    canonical_uid: 'm2',
    sender: { name: 'Liam Vance', username: 'liam_v', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    caption: 'sunset skate session 🛹🌅',
    musicBadge: null,
    timestamp: '32m ago',
    reactions: { '❤️': 5, '🔥': 4, '😂': 0, '😮': 0 }
  },
  {
    id: 'm3',
    canonical_uid: 'm3',
    sender: { name: 'Chloe Kim', username: 'chloekim', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' },
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    caption: 'look who decided to visit my desk 🐱',
    musicBadge: 'Taylor Swift • cardigan',
    timestamp: '2h ago',
    reactions: { '❤️': 7, '🔥': 1, '😂': 2, '😮': 3 }
  }
];

const LOCKET_ICONS = [
  { id: 'ic_gold_on_black', name: 'Gold on Black', file: 'ic_gold_on_black.webp', tag: 'Default Gold' },
  { id: 'ic_black_on_gold', name: 'Black on Gold', file: 'ic_black_on_gold.webp', tag: 'Luxury' },
  { id: 'ic_photos_hearts_black', name: 'Hearts Black', file: 'ic_photos_hearts_black.webp', tag: 'Romantic' },
  { id: 'ic_year_of_the_horse', name: 'Year of the Horse', file: 'ic_year_of_the_horse.webp', tag: 'Special' },
  { id: 'ic_neon_yellow', name: 'Neon Yellow', file: 'ic_neon_yellow.webp', tag: 'Vibrant' },
  { id: 'ic_neon_pink', name: 'Neon Pink', file: 'ic_neon_pink.webp', tag: 'Glow' },
  { id: 'ic_neon_blue', name: 'Neon Blue', file: 'ic_neon_blue.webp', tag: 'Cyber' },
  { id: 'ic_flowers_pink', name: 'Spring Blossom', file: 'ic_flowers_pink.webp', tag: 'Floral' },
  { id: 'ic_flowers_autumn', name: 'Autumn Maple', file: 'ic_flowers_autumn.webp', tag: 'Warm' },
  { id: 'ic_waves_gold', name: 'Golden Waves', file: 'ic_waves_gold.webp', tag: 'Smooth' },
  { id: 'ic_waves_purple', name: 'Cosmic Purple', file: 'ic_waves_purple.webp', tag: 'Deep' },
  { id: 'ic_pastel_3d_gold', name: '3D Gold Gem', file: 'ic_pastel_3d_gold.webp', tag: '3D' },
  { id: 'ic_flat_yellow', name: 'Classic Yellow', file: 'ic_flat_yellow.webp', tag: 'Original' },
  { id: 'ic_tunnel', name: 'Warp Tunnel', file: 'ic_tunnel.webp', tag: 'Retro' },
  { id: 'ic_pendant', name: 'Golden Locket', file: 'ic_pendant.webp', tag: 'Charm' },
  { id: 'ic_notebook', name: 'Memories Book', file: 'ic_notebook.webp', tag: 'Vintage' }
];

// App State
let state = {
  viewMode: 'app',
  captureMode: 'photo', // 'photo' | 'video'
  videoMaxDuration: 90, // 10 | 30 | 90 (Locket Gold 90-second max limit)
  cameraFilter: 'filter-normal',
  isRecording: false,
  mediaRecorder: null,
  recordedChunks: [],
  capturedVideo: null,
  rawMediaBlob: null,
  rawMediaType: null,
  recordTimerInterval: null,
  recordSeconds: 0,
  friendFilter: null,
  activeMomentForViews: null,
  isAuthenticated: false,
  currentUser: null,
  friends: JSON.parse(localStorage.getItem('locket_friends')) || DEFAULT_FRIENDS,
  lockets: JSON.parse(localStorage.getItem('locket_feed')) || DEFAULT_LOCKETS,
  activeRecipient: 'all',
  capturedPhoto: null,
  captionText: '',
  noteType: 'standard',
  selectedBadge: null,
  cameraFacing: 'user',
  flashMode: 'off',
  currentIcon: localStorage.getItem('locket_icon') || 'ic_gold_on_black.webp',
  currentFrame: localStorage.getItem('locket_frame') || 'frame-gold',
  presetIndex: 0,
  isSending: false
};

let mediaStream = null;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
  initUI();
  initCamera();
  renderFriendsChips();
  renderIconsGrid();
  applySelectedIcon(state.currentIcon);
  renderFeed();
  renderWidgets();

  // Initialize session directly from client storage or local config
  await initSession();
});

// =============================================================================
// --- DIRECT LOCKET CLOUD SDK (100% Client-Side / Zero-Server Architecture) ---
// =============================================================================
const LocketCloud = {
  FIREBASE_API_KEY: "AIzaSyCQngaaXQIfJaH0aS2l7REgIjD7nL431So",
  FIREBASE_APP_ID: "1:641029076083:ios:cc8eb46290d69b234fa606",
  IOS_BUNDLE_ID: "com.locket.Locket",
  API_BASE: "https://api.locketcamera.com",
  STORAGE_IMG_URL: "https://firebasestorage.googleapis.com/v0/b/locket-img/o",
  STORAGE_VIDEO_URL: "https://firebasestorage.googleapis.com/v0/b/locket-video/o",
  FIRESTORE_BASE: "https://firestore.googleapis.com/v1/projects/locket-4252a/databases/(default)/documents",

  randomId(len = 20) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let res = '';
    for (let i = 0; i < len; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
  },

  getSession() {
    try {
      const raw = localStorage.getItem('locket_cloud_session');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  setSession(data) {
    localStorage.setItem('locket_cloud_session', JSON.stringify(data));
  },

  clearSession() {
    localStorage.removeItem('locket_cloud_session');
  },

  async getValidToken() {
    const session = this.getSession();
    if (!session || !session.idToken) return null;
    const now = Date.now();
    // Auto-refresh token if within 5 minutes of expiring
    if (session.expiresAt && now > (session.expiresAt - 300000) && session.refreshToken) {
      try {
        const res = await fetch(`https://securetoken.googleapis.com/v1/token?key=${this.FIREBASE_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Ios-Bundle-Identifier': this.IOS_BUNDLE_ID
          },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: session.refreshToken
          })
        });
        const data = await res.json();
        if (data.id_token) {
          session.idToken = data.id_token;
          session.refreshToken = data.refresh_token || session.refreshToken;
          session.expiresAt = now + (parseInt(data.expires_in, 10) * 1000);
          this.setSession(session);
        }
      } catch (e) {
        console.warn('Token refresh error:', e);
      }
    }
    return session.idToken;
  },

  async login(email, password) {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.FIREBASE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Ios-Bundle-Identifier': this.IOS_BUNDLE_ID
      },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    });
    const data = await res.json();
    if (!res.ok || data.error) {
      const rawMsg = data.error?.message || 'Login failed';
      let friendlyMsg = rawMsg;
      if (rawMsg.includes('EMAIL_NOT_FOUND')) friendlyMsg = 'Email này chưa được đăng ký tài khoản Locket.';
      else if (rawMsg.includes('INVALID_PASSWORD')) friendlyMsg = 'Mật khẩu không chính xác.';
      else if (rawMsg.includes('USER_DISABLED')) friendlyMsg = 'Tài khoản Locket này đã bị khoá.';
      else if (rawMsg.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) friendlyMsg = 'Đã thử quá nhiều lần. Vui lòng đợi ít phút rồi thử lại.';
      else if (rawMsg.includes('INVALID_EMAIL')) friendlyMsg = 'Địa chỉ email không đúng định dạng.';
      throw new Error(friendlyMsg);
    }
    const session = {
      uid: data.localId,
      email: data.email,
      idToken: data.idToken,
      refreshToken: data.refreshToken,
      expiresAt: Date.now() + (parseInt(data.expiresIn, 10) * 1000)
    };
    this.setSession(session);
    return session;
  },

  async callApi(endpoint, payload = {}) {
    const token = await this.getValidToken();
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${this.API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        data: {
          ...payload,
          analytics: {
            app_version: '1.243.0',
            os_version: 'iOS 18.0',
            device_model: 'iPhone16,1'
          }
        }
      })
    });
    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.error?.message || data.error || `Locket API error (${res.status})`);
    }
    return data.result || data.data || data;
  },

  async getFeed(knownFriends = null) {
    let friends = knownFriends || state.friends;
    if (!friends || friends.length === 0) {
      friends = await this.getFriends();
    }
    const friendUids = (friends || []).map(f => f.id).filter(Boolean);

    const allMoments = [];
    const seenMids = new Set();

    // 1. First get overall latest moment from feed
    try {
      const initialRes = await this.callApi('getLatestMomentV2', {
        should_count_missed_moments: true,
        include_group_moments: true
      });
      const initItems = Array.isArray(initialRes) ? initialRes : (initialRes.data || initialRes.moments || []);
      for (const m of initItems) {
        const mid = m.canonical_uid || m.id || m.moment_uid;
        if (mid && !seenMids.has(mid)) {
          seenMids.add(mid);
          allMoments.push(m);
        }
      }
    } catch (e) {
      console.warn('Initial getFeed error:', e);
    }

    // 2. Fetch moments across all friends in parallel batches
    if (friendUids.length > 0) {
      const batchSize = 6;
      for (let i = 0; i < friendUids.length; i += batchSize) {
        const batch = friendUids.slice(i, i + batchSize);
        await Promise.all(batch.map(async (targetUid) => {
          const others = friendUids.filter(uid => uid !== targetUid);
          try {
            const res = await this.callApi('getLatestMomentV2', {
              should_count_missed_moments: true,
              include_group_moments: true,
              excluded_users: others
            });
            const items = Array.isArray(res) ? res : (res.data || res.moments || []);
            for (const m of items) {
              const mid = m.canonical_uid || m.id || m.moment_uid;
              if (mid && !seenMids.has(mid)) {
                seenMids.add(mid);
                allMoments.push(m);
              }
            }
          } catch (err) {}
        }));
      }
    }

    // Sort moments chronologically descending (newest first)
    allMoments.sort((a, b) => {
      const tsA = (a.date && a.date._seconds) ? a.date._seconds * 1000 : (new Date(a.created_at || 0).getTime() || 0);
      const tsB = (b.date && b.date._seconds) ? b.date._seconds * 1000 : (new Date(b.created_at || 0).getTime() || 0);
      return tsB - tsA;
    });

    return allMoments;
  },

  async getFriends() {
    const session = this.getSession();
    const token = await this.getValidToken();
    if (!session || !token) return state.friends || [];

    try {
      const res = await fetch(`${this.FIRESTORE_BASE}/users/${session.uid}/friends`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Friends list error');
      const data = await res.json();
      const docs = data.documents || [];
      const friendUids = docs.map(d => d.fields?.user?.stringValue || d.name.split('/').pop()).filter(Boolean);

      // Fast parallel user profile retrieval with caching
      const friends = await Promise.all(friendUids.map(async (fuid) => {
        const cached = (state.friends || []).find(f => f.id === fuid);
        if (cached && cached.name && cached.name !== 'Friend') {
          return cached;
        }
        try {
          const ures = await this.callApi('fetchUserV2', { user_uid: fuid });
          const udata = ures.data || ures;
          if (udata) {
            return {
              id: fuid,
              name: (udata.first_name ? `${udata.first_name} ${udata.last_name || ''}` : udata.username || 'Friend').trim(),
              username: udata.username || 'user',
              avatar: toCdnUrl(udata.profile_picture_url) || AESTHETIC_PRESETS[0],
              streak: udata.streak || 1
            };
          }
        } catch (e) {}
        return cached || { id: fuid, name: 'Friend', username: 'friend', avatar: AESTHETIC_PRESETS[0], streak: 1 };
      }));

      return friends;
    } catch (e) {
      console.warn('Direct getFriends error, fallback to cache:', e);
      return state.friends || [];
    }
  },

  async uploadStorage(blob, isVideo = false) {
    const session = this.getSession();
    const token = await this.getValidToken();
    if (!session || !token) throw new Error('Not authenticated');

    const ext = isVideo ? 'mp4' : 'webp';
    const contentType = isVideo ? 'video/mp4' : 'image/webp';
    const folder = isVideo ? 'videos' : 'thumbnails';
    const randId = this.randomId(20);
    const objectPath = `users/${session.uid}/moments/${folder}/${randId}.${ext}`;
    const encodedName = encodeURIComponent(objectPath);
    const baseUrl = isVideo ? this.STORAGE_VIDEO_URL : this.STORAGE_IMG_URL;

    // Direct single-request binary media upload (100% browser CORS compatible, no blocked Location headers)
    const uploadRes = await fetch(`${baseUrl}?uploadType=media&name=${encodedName}`, {
      method: 'POST',
      headers: {
        'Authorization': `Firebase ${token}`,
        'Content-Type': contentType
      },
      body: blob
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text().catch(() => '');
      throw new Error(`Upload failed (${uploadRes.status}): ${errText}`);
    }

    const uJson = await uploadRes.json();
    const downloadToken = (uJson.downloadTokens || '').split(',')[0] || this.randomId(36);
    return `${baseUrl}/${encodedName}?alt=media&token=${downloadToken}`;
  },

  async postMoment({ imageBlob, videoBlob, caption = '', recipients = [], noteType = 'standard', isGold = false }) {
    let thumbUrl = '';
    let videoUrl = '';

    if (imageBlob) {
      thumbUrl = await this.uploadStorage(imageBlob, false);
    }
    if (videoBlob) {
      videoUrl = await this.uploadStorage(videoBlob, true);
      if (!thumbUrl && imageBlob) {
        thumbUrl = await this.uploadStorage(imageBlob, false);
      }
    }

    const overlays = [];
    if (isGold || noteType === 'gold') {
      overlays.push({
        overlay_type: 'caption',
        overlay_id: 'caption:gold',
        alt_text: `💛 ${caption || 'Locket Gold'}`,
        data: {
          text: caption || 'Locket Gold',
          type: 'gold',
          text_color: '#000000',
          max_lines: { value: '4', '@type': 'type.googleapis.com/google.protobuf.Int64Value' },
          background: { material_blur: 'regular', colors: ['#FFD700', '#FFA500'] },
          icon: { data: '💛', type: 'emoji' }
        }
      });
    } else if (caption) {
      overlays.push({
        overlay_type: 'caption',
        overlay_id: `caption:${noteType || 'standard'}`,
        alt_text: caption,
        data: {
          text: caption,
          type: noteType || 'standard',
          text_color: '#FFFFFF',
          max_lines: { value: '4', '@type': 'type.googleapis.com/google.protobuf.Int64Value' },
          background: { material_blur: 'ultra_thin', colors: [] }
        }
      });
    }

    const payload = {
      thumbnail_url: thumbUrl || videoUrl,
      overlays: overlays,
      sent_to_self_only: false,
      sent_to_all: recipients.length === 0,
      recipients: recipients,
      md5: `${Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2, '0')).join('')}_${Math.floor(Date.now() / 1000)}`
    };
    if (videoUrl) {
      payload.video_url = videoUrl;
    }

    const res = await this.callApi('postMomentV2', payload);
    return {
      result: res,
      data: res.data || res,
      thumbnail_url: thumbUrl || videoUrl,
      video_url: videoUrl
    };
  },

  async deleteMoment(momentUid) {
    return await this.callApi('deleteMomentV2', { moment_uid: momentUid });
  },

  async getViews(momentUid) {
    return await this.callApi('getMomentViews', { moment_uid: momentUid });
  },

  async react(momentUid, emoji) {
    return await this.callApi('createReactionV2', { moment_uid: momentUid, reaction: emoji });
  },

  async addFriend(username) {
    return await this.callApi('createFriendRequestV2', { username: username });
  }
};

// --- CLIENT-SIDE SESSION MANAGEMENT ---
async function initSession() {
  let session = LocketCloud.getSession();

  // If local storage is empty, attempt to pre-seed from local session.json if present
  if (!session || !session.idToken) {
    try {
      const res = await fetch('./session.json');
      if (res.ok) {
        const fileSession = await res.json();
        if (fileSession && fileSession.idToken) {
          session = {
            uid: fileSession.uid,
            email: fileSession.email,
            idToken: fileSession.idToken,
            refreshToken: fileSession.refreshToken,
            expiresAt: fileSession.expiresAt || (Date.now() + 3600000)
          };
          LocketCloud.setSession(session);
        }
      }
    } catch (e) {}
  }

  if (session && session.idToken) {
    try {
      const token = await LocketCloud.getValidToken();
      if (token) {
        state.isAuthenticated = true;
        state.currentUser = { uid: session.uid, email: session.email };
        updateAuthUI(true, state.currentUser);

        // Fetch user profile in background to get real name, username and avatar
        LocketCloud.callApi('fetchUserV2', { user_uid: session.uid }).then(res => {
          const u = res?.data || res;
          if (u) {
            state.currentUser.username = u.username;
            state.currentUser.displayName = (u.first_name ? `${u.first_name} ${u.last_name || ''}` : u.username || 'You').trim();
            state.currentUser.avatar = toCdnUrl(u.profile_picture_url);
            updateAuthUI(true, state.currentUser);
          }
        }).catch(() => {});

        // Concurrently refresh friends & live moments in background without blocking
        fetchLiveFriends().catch(console.warn);
        fetchLiveFeed().catch(console.warn);

        showToast('Connected directly to Locket Cloud ⚡️');
        return;
      }
    } catch (err) {
      console.warn('Session verification error:', err);
    }
  }

  updateAuthUI(false);
  renderFeed();
  renderWidgets();
}

async function handleLogin(event) {
  event.preventDefault();
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const btn = document.getElementById('login-submit-btn');
  const errBox = document.getElementById('login-error-msg');

  const email = emailInput?.value.trim();
  const password = passwordInput?.value.trim();

  if (!email || !password) {
    if (errBox) {
      errBox.innerText = 'Please enter both email and password.';
      errBox.classList.remove('hidden');
    }
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>Signing In...</span> <div class="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>`;
  }
  if (errBox) errBox.classList.add('hidden');

  try {
    const session = await LocketCloud.login(email, password);
    state.isAuthenticated = true;
    state.currentUser = { uid: session.uid, email: session.email };

    // Reset local cache for new account
    state.friends = [];
    state.lockets = [];
    state.friendFilter = null;
    localStorage.removeItem('locket_friends');
    localStorage.removeItem('locket_feed');

    updateAuthUI(true, state.currentUser);
    closeModal('login-modal');
    sfx.playGoldChime();
    showToast(`Logged in directly as ${session.email}! 🌟`);

    await fetchLiveFriends();
    await fetchLiveFeed();
  } catch (err) {
    if (errBox) {
      errBox.innerText = err.message || 'Login failed. Please check credentials.';
      errBox.classList.remove('hidden');
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<span>Log In</span> <span>➔</span>`;
    }
  }
}

async function handleLogout() {
  LocketCloud.clearSession();
  state.isAuthenticated = false;
  state.currentUser = null;
  state.friends = DEFAULT_FRIENDS;
  state.lockets = DEFAULT_LOCKETS;
  state.friendFilter = null;
  localStorage.removeItem('locket_friends');
  localStorage.removeItem('locket_feed');

  updateAuthUI(false);
  renderFriendsChips();
  renderFeed();
  renderWidgets();
  showToast('Logged out of Locket.');
}

async function fetchLiveFriends() {
  try {
    const friends = await LocketCloud.getFriends();
    if (Array.isArray(friends) && friends.length > 0) {
      state.friends = friends;
      saveState();
      renderFriendsChips();
      renderFriendsListModal();
    }
  } catch (err) {
    console.warn('Failed to fetch live friends:', err);
  }
}

async function fetchLiveFeed() {
  try {
    const moments = await LocketCloud.getFeed(state.friends);
    if (Array.isArray(moments) && moments.length > 0) {
      const liveList = moments.map(m => {
        let caption = m.caption || '';
        let badge = m.badge || null;
        let isGold = false;
        if (Array.isArray(m.overlays) && m.overlays.length > 0) {
          const ov = m.overlays[0];
          caption = ov.data?.text || ov.alt_text || caption;
          const ovType = (ov.data?.type || ov.overlay_id || '').toLowerCase();
          const alt = (ov.alt_text || '').toLowerCase();
          if (ovType.includes('gold') || alt.includes('💛') || alt.includes('gold') || alt.includes('👑')) {
            isGold = true;
            badge = 'gold';
          }
        }
        if (caption && (caption.toLowerCase().includes('locket gold') || caption.includes('💛') || caption.includes('👑'))) {
          isGold = true;
          badge = 'gold';
        }
        let ts = 'Recent';
        if (m.created_at || m.date) {
          try {
            const rawTs = m.created_at || (m.date?._seconds ? m.date._seconds * 1000 : null);
            if (rawTs) {
              const d = new Date(rawTs);
              ts = d.toLocaleDateString('vi-VN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            }
          } catch(e) {}
        }
        const friend = (state.friends || []).find(f => f.id === m.user);
        const isSelf = m.user === state.currentUser?.uid;
        const senderName = isSelf ? (state.currentUser?.displayName || 'You') : (friend ? friend.name : (m.user_name || (m.user ? `Friend (${m.user.slice(0, 5)})` : 'Friend')));
        const senderUsername = isSelf ? (state.currentUser?.username || 'you') : (friend ? friend.username : (m.username || m.user_username || 'user'));
        const senderAvatar = isSelf ? (state.currentUser?.avatar || AESTHETIC_PRESETS[0]) : (friend ? friend.avatar : (toCdnUrl(m.user_avatar) || AESTHETIC_PRESETS[0]));

        return {
          id: m.canonical_uid || m.id || m.moment_uid,
          canonical_uid: m.canonical_uid || m.id || m.moment_uid,
          user_uid: m.user,
          sender: {
            name: senderName,
            username: senderUsername,
            avatar: senderAvatar
          },
          imageUrl: toCdnUrl(m.thumbnail_url || m.image_url),
          videoUrl: toCdnUrl(m.video_url),
          caption: caption,
          isGold: isGold,
          musicBadge: badge,
          created_at: m.created_at || (m.date?._seconds ? m.date._seconds * 1000 : null),
          timestamp: ts,
          reactions: m.reactions || { '❤️': 0, '🔥': 0 }
        };
      });

      // Preserve any just-sent local moments if not yet indexed by Locket Cloud
      const seenIds = new Set(liveList.map(l => l.id));
      for (const loc of state.lockets) {
        if (!seenIds.has(loc.id) && loc.timestamp === 'Just now') {
          liveList.unshift(loc);
          seenIds.add(loc.id);
        }
      }

      state.lockets = liveList;

      // Strict chronological sorting: NEWEST ON TOP
      state.lockets.sort((a, b) => {
        const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return timeB - timeA;
      });

      saveState();
      renderFeed();
      renderWidgets();
    }
  } catch (err) {
    console.warn('Failed to fetch live feed:', err);
    renderFeed();
    renderWidgets();
  }
}

function updateAuthUI(isLoggedIn, user = null) {
  const loginBtn = document.getElementById('top-login-btn');
  const userBadge = document.getElementById('top-user-badge');
  const userEmail = document.getElementById('top-user-email');

  if (isLoggedIn && user) {
    loginBtn?.classList.add('hidden');
    userBadge?.classList.remove('hidden');
    if (userEmail) userEmail.innerText = user.email || user.username || 'Connected';
  } else {
    loginBtn?.classList.remove('hidden');
    userBadge?.classList.add('hidden');
  }
}

// --- CAMERA SUBSYSTEM ---
async function initCamera(withAudio = false) {
  const video = document.getElementById('camera-feed');
  const fallback = document.getElementById('camera-fallback');
  if (!video) return;

  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
  }

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: state.cameraFacing,
        width: { ideal: 1080 },
        height: { ideal: 1080 }
      },
      audio: withAudio
    });
    video.srcObject = mediaStream;
    video.classList.remove('hidden');
    if (fallback) fallback.classList.add('hidden');
  } catch (err) {
    // If microphone access was rejected, try fallback with video only
    if (withAudio) {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: state.cameraFacing, width: { ideal: 1080 }, height: { ideal: 1080 } },
          audio: false
        });
        video.srcObject = mediaStream;
        video.classList.remove('hidden');
        if (fallback) fallback.classList.add('hidden');
        return;
      } catch (e2) {}
    }
    console.warn('Camera access unavailable; using preset camera fallback.', err);
    video.classList.add('hidden');
    if (fallback) {
      fallback.classList.remove('hidden');
      updateFallbackImage();
    }
  }
}

function updateFallbackImage() {
  const img = document.getElementById('fallback-preview-img');
  if (img) {
    img.src = AESTHETIC_PRESETS[state.presetIndex % AESTHETIC_PRESETS.length];
  }
}

function toggleCameraFacing() {
  state.cameraFacing = state.cameraFacing === 'user' ? 'environment' : 'user';
  initCamera();
}

function toggleFlash() {
  state.flashMode = state.flashMode === 'off' ? 'on' : 'off';
  const flashBtn = document.getElementById('flash-toggle-btn');
  if (flashBtn) {
    if (state.flashMode === 'on') {
      flashBtn.classList.add('text-yellow-400');
      flashBtn.classList.remove('text-white');
    } else {
      flashBtn.classList.remove('text-yellow-400');
      flashBtn.classList.add('text-white');
    }
  }
}

function setCameraFilter(filterName) {
  sfx.playPop();
  state.cameraFilter = filterName;
  const video = document.getElementById('camera-feed');
  const fallback = document.getElementById('fallback-preview-img');
  const postCaptureImg = document.getElementById('post-capture-img');

  const filterClasses = [
    'filter-normal', 'filter-golden-hour', 'filter-vintage-noir',
    'filter-retro-film', 'filter-cyberpunk', 'filter-emerald', 'filter-warm-sunset'
  ];

  [video, fallback, postCaptureImg].forEach(el => {
    if (!el) return;
    filterClasses.forEach(c => el.classList.remove(c));
    el.classList.add(filterName);
  });

  document.querySelectorAll('.filter-pill').forEach(btn => {
    if (btn.getAttribute('onclick')?.includes(filterName)) {
      btn.classList.add('border-yellow-400', 'text-yellow-400');
    } else {
      btn.classList.remove('border-yellow-400', 'text-yellow-400');
    }
  });

  showToast(`Filter: ${filterName.replace('filter-', '').replace('-', ' ')} ✨`);
}

function setCaptureMode(mode) {
  sfx.playPop();
  state.captureMode = mode;
  const btnPhoto = document.getElementById('mode-btn-photo');
  const btnVideo = document.getElementById('mode-btn-video');
  const dot = document.getElementById('shutter-inner-dot');
  const durSelector = document.getElementById('video-duration-selector');
  const timerText = document.getElementById('recording-timer-text');

  if (mode === 'photo') {
    btnPhoto?.classList.add('text-yellow-400', 'border-b-2', 'border-yellow-400');
    btnPhoto?.classList.remove('text-zinc-400');
    btnVideo?.classList.remove('text-yellow-400', 'border-b-2', 'border-yellow-400');
    btnVideo?.classList.add('text-zinc-400');
    durSelector?.classList.add('hidden');
    if (dot) {
      dot.className = 'w-6 h-6 rounded-full bg-yellow-400 transition-all duration-200';
    }
  } else {
    btnVideo?.classList.add('text-yellow-400', 'border-b-2', 'border-yellow-400');
    btnVideo?.classList.remove('text-zinc-400');
    btnPhoto?.classList.remove('text-yellow-400', 'border-b-2', 'border-yellow-400');
    btnPhoto?.classList.add('text-zinc-400');
    durSelector?.classList.remove('hidden');
    if (dot) {
      dot.className = 'w-6 h-6 rounded-full bg-red-500 transition-all duration-200';
    }
    // Update timer text for selected max duration
    const maxDur = state.videoMaxDuration || 90;
    const maxMins = String(Math.floor(maxDur / 60)).padStart(2, '0');
    const maxSecs = String(maxDur % 60).padStart(2, '0');
    if (timerText) timerText.innerText = `00:00 / ${maxMins}:${maxSecs}`;
    
    // Switch camera to include audio for video recording
    initCamera(true);
  }
}

function setVideoDuration(seconds) {
  sfx.playPop();
  state.videoMaxDuration = seconds;
  [10, 30, 90, 180, 300, 600, 1800].forEach(s => {
    const btn = document.getElementById(`dur-btn-${s}`);
    if (btn) {
      if (s === seconds) {
        btn.className = 'px-2 py-0.5 rounded-full bg-yellow-400 text-black font-bold transition shadow-sm';
      } else {
        btn.className = 'px-2 py-0.5 rounded-full hover:text-white transition';
      }
    }
  });

  const maxMins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const maxSecs = String(seconds % 60).padStart(2, '0');
  const timerText = document.getElementById('recording-timer-text');
  if (timerText) timerText.innerText = `00:00 / ${maxMins}:${maxSecs}`;
  const durLabel = seconds >= 60 ? `${Math.floor(seconds/60)}m` : `${seconds}s`;
  showToast(`Video duration limit: ${durLabel} (Locket Gold) ⏱️`);
}

function handleShutterClick() {
  if (state.captureMode === 'photo') {
    takePhoto();
  } else {
    if (!state.isRecording) {
      startVideoRecording();
    } else {
      stopVideoRecording();
    }
  }
}

function takePhoto() {
  sfx.playShutter();

  const flashOverlay = document.getElementById('camera-flash-overlay');
  if (flashOverlay) {
    flashOverlay.classList.remove('hidden');
    flashOverlay.classList.add('camera-flash-active');
    setTimeout(() => {
      flashOverlay.classList.remove('camera-flash-active');
      flashOverlay.classList.add('hidden');
    }, 350);
  }

  const shutterBtn = document.getElementById('shutter-btn');
  if (shutterBtn) {
    shutterBtn.classList.add('shutter-pressed');
    setTimeout(() => shutterBtn.classList.remove('shutter-pressed'), 300);
  }

  const video = document.getElementById('camera-feed');
  let dataUrl = null;

  if (video && !video.classList.contains('hidden') && video.videoWidth > 0) {
    const canvas = document.createElement('canvas');
    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const startX = (video.videoWidth - size) / 2;
    const startY = (video.videoHeight - size) / 2;

    if (state.cameraFacing === 'user') {
      ctx.translate(size, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, startX, startY, size, size, 0, 0, size, size);
    dataUrl = canvas.toDataURL('image/webp', 0.85);
    canvas.toBlob((blob) => {
      state.rawMediaBlob = blob;
      state.rawMediaType = 'image/webp';
    }, 'image/webp', 0.85);
  } else {
    dataUrl = AESTHETIC_PRESETS[state.presetIndex % AESTHETIC_PRESETS.length];
    state.presetIndex++;
    updateFallbackImage();
    state.rawMediaBlob = null;
  }

  state.capturedPhoto = dataUrl;
  state.capturedVideo = null;
  showPostCaptureView(dataUrl, null);
}

async function startVideoRecording() {
  if (state.isRecording) return;
  sfx.playPop();

  const shutter = document.getElementById('shutter-btn');
  const dot = document.getElementById('shutter-inner-dot');
  const progressBar = document.getElementById('recording-progress-bar');
  const timerBadge = document.getElementById('recording-timer-badge');
  const timerText = document.getElementById('recording-timer-text');

  let stream = mediaStream;
  if (!stream) {
    showToast('Simulation: Captured 90s video moment from APK 🎬');
    state.capturedVideo = './assets/video/assets_video_rollcall_onboarding.mp4';
    state.capturedPhoto = null;
    state.rawMediaBlob = null;
    showPostCaptureView(null, state.capturedVideo);
    return;
  }

  try {
    state.recordedChunks = [];
    let mimeType = 'video/webm;codecs=vp9,opus';
    if (!window.MediaRecorder || !MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'video/webm;codecs=vp8,opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
        if (!MediaRecorder.isTypeSupported(mimeType)) mimeType = '';
      }
    }

    state.mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    state.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) state.recordedChunks.push(e.data);
    };

    state.mediaRecorder.onstop = () => {
      const blob = new Blob(state.recordedChunks, { type: state.mediaRecorder.mimeType || 'video/webm' });
      state.rawMediaBlob = blob;
      state.rawMediaType = blob.type || 'video/webm';
      const objUrl = URL.createObjectURL(blob);
      state.capturedVideo = objUrl;
      state.capturedPhoto = null;
      showPostCaptureView(null, objUrl);
    };

    state.mediaRecorder.start(200);
    state.isRecording = true;
    state.recordSeconds = 0;

    shutter?.classList.add('shutter-recording');
    if (dot) dot.className = 'w-5 h-5 rounded-sm bg-red-500 transition-all duration-200';
    progressBar?.classList.remove('hidden');
    timerBadge?.classList.remove('hidden');

    const maxDuration = state.videoMaxDuration || 90;
    const maxMins = String(Math.floor(maxDuration / 60)).padStart(2, '0');
    const maxSecs = String(maxDuration % 60).padStart(2, '0');

    state.recordTimerInterval = setInterval(() => {
      state.recordSeconds += 0.2;
      const pct = Math.min(100, (state.recordSeconds / maxDuration) * 100);
      if (progressBar) progressBar.style.width = pct + '%';
      if (timerText) {
        const curSec = Math.floor(state.recordSeconds);
        const curMins = String(Math.floor(curSec / 60)).padStart(2, '0');
        const curSecRem = String(curSec % 60).padStart(2, '0');
        timerText.innerText = `${curMins}:${curSecRem} / ${maxMins}:${maxSecs}`;
      }
      if (state.recordSeconds >= maxDuration) {
        stopVideoRecording();
      }
    }, 200);

  } catch (err) {
    console.warn('Video recording error:', err);
    showToast('Video recording not supported on this browser.');
  }
}

function stopVideoRecording() {
  if (!state.isRecording) return;
  sfx.playShutter();
  clearInterval(state.recordTimerInterval);
  state.isRecording = false;

  const shutter = document.getElementById('shutter-btn');
  const dot = document.getElementById('shutter-inner-dot');
  const progressBar = document.getElementById('recording-progress-bar');
  const timerBadge = document.getElementById('recording-timer-badge');

  shutter?.classList.remove('shutter-recording');
  if (dot) dot.className = 'w-6 h-6 rounded-full bg-red-500 transition-all duration-200';
  progressBar?.classList.add('hidden');
  timerBadge?.classList.add('hidden');
  if (progressBar) progressBar.style.width = '0%';

  if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
    state.mediaRecorder.stop();
  }
}

function showPostCaptureView(imgSrc, videoSrc = null) {
  const viewfinder = document.getElementById('viewfinder-container');
  const postCapture = document.getElementById('post-capture-container');
  const previewImg = document.getElementById('post-capture-img');
  const previewVideo = document.getElementById('post-capture-video');
  const captionInput = document.getElementById('caption-input');
  const badge = document.getElementById('post-capture-badge');

  if (viewfinder) viewfinder.classList.add('hidden');
  if (postCapture) postCapture.classList.remove('hidden');

  if (videoSrc) {
    if (previewImg) previewImg.classList.add('hidden');
    if (previewVideo) {
      previewVideo.classList.remove('hidden');
      previewVideo.src = videoSrc;
      previewVideo.play().catch(() => {});
    }
    const durSec = Math.round(state.recordSeconds || state.videoMaxDuration || 90);
    if (badge) badge.innerHTML = `<span>Gold Video (${durSec}s)</span> <span>🎬</span>`;
  } else {
    if (previewVideo) {
      previewVideo.pause();
      previewVideo.classList.add('hidden');
    }
    if (previewImg) {
      previewImg.classList.remove('hidden');
      previewImg.src = imgSrc;
    }
    if (badge) badge.innerHTML = `<span>Ready to Send</span> <span>⚡️</span>`;
  }

  if (captionInput) {
    captionInput.value = '';
    captionInput.focus();
  }
}

function cancelCapture() {
  state.capturedPhoto = null;
  state.capturedVideo = null;
  state.captionText = '';
  state.noteType = 'standard';
  state.selectedBadge = null;

  const previewVideo = document.getElementById('post-capture-video');
  if (previewVideo) {
    previewVideo.pause();
    previewVideo.src = '';
  }

  const viewfinder = document.getElementById('viewfinder-container');
  const postCapture = document.getElementById('post-capture-container');
  if (viewfinder) viewfinder.classList.remove('hidden');
  if (postCapture) postCapture.classList.add('hidden');
}

function setBadgePreset(badgeKey, text) {
  sfx.playPop();
  state.noteType = badgeKey;
  state.selectedBadge = text;
  const input = document.getElementById('caption-input');
  if (input) {
    input.value = text;
    input.focus();
  }
  showToast(`Applied badge: ${text} ✨`);
}

function applyNoteType(type) {
  sfx.playPop();
  state.noteType = type;
  const input = document.getElementById('caption-input');
  let text = '';

  if (type === 'time') {
    const now = new Date();
    text = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  } else if (type === 'location') {
    text = '📍 Hà Nội, VN';
  } else if (type === 'weather') {
    text = '☀️ 28°C • Nắng đẹp';
  } else if (type === 'music') {
    text = '🎵 Sabrina Carpenter • Espresso';
  } else if (type === 'review') {
    text = '★★★★★ Tuyệt vời!';
  }

  if (input) {
    input.value = text;
    input.focus();
  }
  showToast(`Applied ${type} note: ${text} ✨`);
}

function toggleGoldBadge() {
  sfx.playGoldChime();
  if (state.noteType === 'gold') {
    state.noteType = 'standard';
    state.selectedBadge = null;
    updateGoldBadgeUI(false);
    showToast('Removed Locket Gold badge');
  } else {
    state.noteType = 'gold';
    state.selectedBadge = '💛 Locket Gold';
    const input = document.getElementById('caption-input');
    if (input && !input.value.trim()) {
      input.value = 'Locket Gold ✨';
    }
    updateGoldBadgeUI(true);
    showToast('Applied 💛 Locket Gold VIP Badge!');
  }
}

function updateGoldBadgeUI(isActive) {
  const btn = document.getElementById('badge-gold-btn');
  if (!btn) return;
  if (isActive) {
    btn.className = 'px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-black font-extrabold shadow-lg ring-2 ring-yellow-400 scale-105 transition flex items-center gap-1';
  } else {
    btn.className = 'px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 hover:bg-yellow-400 hover:text-black font-extrabold whitespace-nowrap flex items-center gap-1 transition shadow-sm';
  }
}

function joinRollCall() {
  sfx.playGoldChime();
  setCaptureMode('photo');
  state.noteType = 'rollcall';
  setBadgePreset('rollcall', '🔥 Daily Roll Call: Active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const viewfinder = document.getElementById('viewfinder-container');
  if (viewfinder) {
    viewfinder.classList.add('widget-updated');
    setTimeout(() => viewfinder.classList.remove('widget-updated'), 500);
  }
  showToast('Daily Roll Call joined! Snap your moment 📸');
}

function dataURLtoBlob(dataurl) {
  if (!dataurl || typeof dataurl !== 'string' || !dataurl.startsWith('data:')) return null;
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

async function convertToWebpBlob(blob) {
  if (!blob) return null;
  if (blob.type === 'image/webp') return blob;
  return new Promise((resolve) => {
    try {
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width || 800;
        canvas.height = img.naturalHeight || img.height || 800;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((webpBlob) => {
          resolve(webpBlob || blob);
        }, 'image/webp', 0.85);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(blob);
      };
      img.src = url;
    } catch (e) {
      resolve(blob);
    }
  });
}

async function extractVideoThumbnail(videoBlob) {
  return new Promise((resolve) => {
    try {
      const v = document.createElement('video');
      v.src = URL.createObjectURL(videoBlob);
      v.muted = true;
      v.playsInline = true;
      v.currentTime = 0.1;
      v.onloadeddata = () => {
        v.currentTime = 0.1;
      };
      v.onseeked = () => {
        const c = document.createElement('canvas');
        c.width = v.videoWidth || 720;
        c.height = v.videoHeight || 720;
        const ctx = c.getContext('2d');
        ctx.drawImage(v, 0, 0, c.width, c.height);
        c.toBlob((b) => {
          URL.revokeObjectURL(v.src);
          resolve(b);
        }, 'image/webp', 0.85);
      };
      v.onerror = () => resolve(null);
      setTimeout(() => resolve(null), 3500);
    } catch (e) {
      resolve(null);
    }
  });
}

async function sendLocket() {
  if ((!state.capturedPhoto && !state.capturedVideo && !state.rawMediaBlob) || state.isSending) return;
  state.isSending = true;

  const captionInput = document.getElementById('caption-input');
  const caption = captionInput ? captionInput.value.trim() : '';
  const sendBtn = document.getElementById('send-post-btn');

  if (sendBtn) {
    sendBtn.disabled = true;
    sendBtn.innerHTML = `<div class="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>`;
  }

  sfx.playSendWhoosh();

  if (state.isAuthenticated) {
    try {
      showToast('Publishing moment directly to Locket Cloud... ⏳');
      const isVideo = Boolean(state.capturedVideo || (state.rawMediaType && state.rawMediaType.includes('video')));

      let imageBlob = null;
      let videoBlob = null;

      if (isVideo) {
        videoBlob = state.rawMediaBlob;
        imageBlob = await extractVideoThumbnail(videoBlob);
      } else {
        imageBlob = state.rawMediaBlob;
        if (!imageBlob && state.capturedPhoto) {
          if (typeof state.capturedPhoto === 'string' && state.capturedPhoto.startsWith('data:')) {
            imageBlob = dataURLtoBlob(state.capturedPhoto);
          } else if (typeof state.capturedPhoto === 'string' && state.capturedPhoto.startsWith('http')) {
            try {
              const resp = await fetch(state.capturedPhoto);
              imageBlob = await resp.blob();
            } catch (e) {
              console.warn('Fetch fallback image error:', e);
            }
          }
        }
      }

      if (imageBlob && !isVideo) {
        imageBlob = await convertToWebpBlob(imageBlob);
      }

      const isGold = state.noteType === 'gold';
      const recipients = state.activeRecipient !== 'all' ? [state.activeRecipient] : [];

      const postResult = await LocketCloud.postMoment({
        imageBlob,
        videoBlob,
        caption,
        recipients,
        noteType: state.noteType || 'standard',
        isGold
      });

      // Immediately display newly posted moment at top of feed & local widgets
      const postedData = postResult?.data || {};
      const newMoment = {
        id: postedData.canonical_uid || ('m_' + Date.now()),
        canonical_uid: postedData.canonical_uid || ('m_' + Date.now()),
        user_uid: state.currentUser?.uid,
        sender: {
          name: state.currentUser?.displayName || 'You',
          username: state.currentUser?.username || 'you',
          avatar: state.currentUser?.avatar || AESTHETIC_PRESETS[0]
        },
        imageUrl: postResult?.thumbnail_url || toCdnUrl(postedData.thumbnail_url),
        videoUrl: postResult?.video_url || toCdnUrl(postedData.video_url) || null,
        caption: caption,
        isGold: isGold,
        musicBadge: isGold ? 'gold' : null,
        timestamp: 'Just now',
        created_at: new Date().toISOString(),
        reactions: {}
      };

      state.lockets.unshift(newMoment);
      saveState();
      renderFeed();
      renderWidgets();

      sfx.playGoldChime();
      showToast('Live moment published directly to friends’ widgets! 🚀');
      fetchLiveFeed().catch(() => {});
    } catch (err) {
      console.error('Direct cloud upload error:', err);
      showToast(`Upload error: ${err.message}`);
    } finally {
      state.isSending = false;
      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.innerHTML = `<svg class="w-6 h-6 transform rotate-45" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>`;
      }
      cancelCapture();
      return;
    }
  }

  // Fallback demo mode
  const newLocket = {
    id: 'm_' + Date.now(),
    canonical_uid: 'm_' + Date.now(),
    sender: {
      name: 'You (dj)',
      username: 'dj_locket',
      avatar: 'assets/icons/' + state.currentIcon
    },
    imageUrl: state.capturedPhoto || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    videoUrl: state.capturedVideo,
    caption: caption || 'sent to widget ✨',
    musicBadge: state.noteType === 'music' ? 'Sabrina Carpenter • Espresso' : null,
    timestamp: 'Just now',
    reactions: { '❤️': 0, '🔥': 0, '😂': 0, '😮': 0 }
  };

  state.lockets.unshift(newLocket);
  saveState();

  if (state.activeRecipient !== 'all') {
    const friend = state.friends.find(f => f.id === state.activeRecipient);
    if (friend) friend.streak++;
  } else {
    state.friends.forEach(f => f.streak++);
  }
  saveState();

  renderWidgets();
  renderFeed();
  renderFriendsChips();
  cancelCapture();
  state.isSending = false;
  if (sendBtn) {
    sendBtn.disabled = false;
    sendBtn.innerHTML = `<svg class="w-6 h-6 transform rotate-45" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>`;
  }
  showToast('Sent to friends’ home screens! ⚡️');
}

function handleFileUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
  const isVideo = file.type.startsWith('video/') || /\.(mp4|mov|m4v|webm)$/i.test(file.name);

  state.rawMediaBlob = file;
  state.rawMediaType = file.type || (isVideo ? 'video/mp4' : 'image/jpeg');

  const objUrl = URL.createObjectURL(file);

  if (isVideo) {
    state.capturedVideo = objUrl;
    state.capturedPhoto = null;
    showPostCaptureView(null, objUrl);
    const badge = document.getElementById('post-capture-badge');
    if (badge) badge.innerHTML = `<span>Gold Video (${sizeMb}MB)</span> <span>🚀</span>`;
    showToast(`Selected Video: ${sizeMb} MB (Locket Gold 90s Bypass) ✨`);
  } else {
    state.capturedPhoto = objUrl;
    state.capturedVideo = null;
    showPostCaptureView(objUrl, null);
    showToast(`Selected Photo: ${sizeMb} MB ✨`);
  }
}

// Reactions & API
async function reactToLocket(locketId, emoji, event) {
  sfx.playPop();

  const locket = state.lockets.find(m => (m.id === locketId || m.canonical_uid === locketId));
  if (locket) {
    if (!locket.reactions) locket.reactions = {};
    if (!locket.reactions[emoji]) locket.reactions[emoji] = 0;
    locket.reactions[emoji]++;
    saveState();
    renderFeed();
    renderWidgets();
  }

  if (state.isAuthenticated && locket) {
    try {
      await LocketCloud.react(locket.canonical_uid || locket.id, emoji);
    } catch (e) {
      console.warn('React API error:', e);
    }
  }

  spawnReactionParticles(emoji, event);
}

function spawnReactionParticles(emoji, event) {
  const container = document.body;
  const rect = event ? event.currentTarget.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };

  for (let i = 0; i < 7; i++) {
    const particle = document.createElement('div');
    particle.className = 'reaction-particle';
    particle.innerText = emoji;

    const offsetX = (Math.random() - 0.5) * 80;
    const offsetY = (Math.random() - 0.5) * 30;
    particle.style.left = (rect.left + rect.width / 2 + offsetX) + 'px';
    particle.style.top = (rect.top + offsetY) + 'px';

    const duration = 0.9 + Math.random() * 0.5;
    particle.style.animationDuration = duration + 's';

    container.appendChild(particle);
    setTimeout(() => particle.remove(), duration * 1000);
  }
}

// --- RENDER FUNCTIONS ---
function renderFeed() {
  const container = document.getElementById('feed-container');
  if (!container) return;

  let activeList = state.lockets;

  // Filter by Friend if active
  if (state.friendFilter) {
    activeList = activeList.filter(l => 
      l.sender?.username === state.friendFilter ||
      l.sender?.name === state.friendFilter ||
      l.user_uid === state.friendFilter
    );
  }

  let filterBanner = '';
  if (state.friendFilter) {
    filterBanner = `
      <div class="flex items-center justify-between px-3 py-2 mb-4 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl text-xs shadow-sm">
        <span class="font-semibold text-yellow-300 flex items-center gap-1.5">
          <span>🔍</span> <span>Showing feed from: @${state.friendFilter}</span>
        </span>
        <button onclick="clearFriendFilter()" class="px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 font-bold hover:bg-yellow-400 hover:text-black transition">
          Clear ✕
        </button>
      </div>
    `;
  }

  if (activeList.length === 0) {
    container.innerHTML = filterBanner + `
      <div class="text-center py-12 text-zinc-500">
        <p class="text-sm">No photos found in this feed.</p>
        ${state.friendFilter ? `<button onclick="clearFriendFilter()" class="mt-2 text-xs text-yellow-400 underline">Show all friends</button>` : ''}
      </div>
    `;
    return;
  }

  container.innerHTML = filterBanner + activeList.map(locket => {
    const totalReactions = Object.values(locket.reactions || {}).reduce((a, b) => a + b, 0);
    const isVideo = Boolean(locket.videoUrl);
    const momentId = locket.id || locket.canonical_uid || locket.moment_uid;

    return `
      <div class="bg-zinc-900/90 border border-zinc-800 rounded-[28px] overflow-hidden shadow-xl mb-6">
        <div class="flex items-center justify-between p-3.5">
          <div class="flex items-center gap-3 cursor-pointer" onclick="filterByFriend('${locket.sender?.username || locket.sender?.name}')" title="Click to filter by this friend">
            <img src="${toCdnUrl(locket.sender?.avatar)}" alt="${locket.sender?.name}" class="w-9 h-9 rounded-full object-cover border border-zinc-700" data-original-url="${locket.sender?.avatar}" onerror="handleImageError(this)">
            <div>
              <h4 class="text-sm font-semibold text-white leading-tight hover:text-yellow-400 transition">${locket.sender?.name || 'Friend'}</h4>
              <p class="text-xs text-zinc-400">@${locket.sender?.username || 'user'} • ${locket.timestamp}</p>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <button onclick="openViewsModal('${momentId}')" class="glass-pill px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs text-zinc-300 hover:text-yellow-400 transition" title="Views & Details">
              <span>👁️</span>
              <span class="font-medium">${totalReactions > 0 ? totalReactions : '0'}</span>
            </button>
          </div>
        </div>

        <div class="relative aspect-square w-full bg-black overflow-hidden group flex items-center justify-center">
          ${isVideo ? `
            <video id="vid-${momentId}" src="${toVideoStreamUrl(locket.videoUrl)}" data-original-url="${toCdnUrl(locket.videoUrl)}" poster="${toCdnUrl(locket.imageUrl)}" playsinline webkit-playsinline preload="metadata" loop muted class="feed-video-element w-full h-full object-cover cursor-pointer" onclick="togglePlayVideo('vid-${momentId}')" onplay="handleVideoPlayState('vid-${momentId}', true)" onpause="handleVideoPlayState('vid-${momentId}', false)" onerror="handleVideoError(this)"></video>
            
            <!-- Sleek Play/Pause Floating Overlay -->
            <button id="play-btn-vid-${momentId}" onclick="togglePlayVideo('vid-${momentId}')" class="absolute w-14 h-14 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-2xl transition-all transform group-hover:scale-105 active:scale-95 z-10" title="Play Video">
              <svg class="w-6 h-6 ml-0.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>

            <!-- Video Status & Audio Badges (Top Right) -->
            <div class="absolute top-3 right-3 flex items-center gap-1.5 z-10 pointer-events-auto">
              <button onclick="toggleVideoMute('vid-${momentId}', this)" class="glass-pill px-2.5 py-1 rounded-full text-xs text-white hover:bg-black/80 transition flex items-center gap-1 shadow-md" title="Mute / Unmute">
                <span class="audio-icon">🔇</span>
              </button>
              <span class="glass-pill px-2.5 py-1 rounded-full text-[10px] text-yellow-400 font-bold border border-yellow-400/30 shadow-md">🎬 VIDEO</span>
            </div>
          ` : `
            <img src="${toCdnUrl(locket.imageUrl)}" alt="Locket moment" class="w-full h-full object-cover" data-original-url="${locket.imageUrl}" onerror="handleImageError(this)">
          `}
          
          ${locket.isGold || locket.musicBadge === 'gold' ? `
            <div class="absolute top-3 left-3 z-10">
              <div class="px-2.5 py-1 rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-black font-extrabold text-[10px] flex items-center gap-1 shadow-xl border border-yellow-200/50">
                <span>💛</span>
                <span>LOCKET GOLD</span>
              </div>
            </div>
          ` : (locket.musicBadge ? `
            <div class="absolute top-3 left-3">
              <div class="glass-pill px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                <span class="text-xs">🎵</span>
                <span class="text-[11px] font-medium text-zinc-200 tracking-tight">${locket.musicBadge}</span>
              </div>
            </div>
          ` : '')}

          ${locket.caption ? `
            <div class="absolute bottom-3 left-3 right-3 flex flex-col items-center pointer-events-none z-10">
              <div class="${locket.isGold || locket.musicBadge === 'gold' ? 'px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-black font-bold shadow-2xl border border-yellow-200/60 max-w-[90%] text-center flex items-center gap-1.5' : 'glass-pill px-3.5 py-1.5 rounded-full max-w-[90%] text-center shadow-lg'}">
                ${locket.isGold || locket.musicBadge === 'gold' ? '<span>👑</span>' : ''}
                <span class="text-xs ${locket.isGold || locket.musicBadge === 'gold' ? 'font-extrabold text-black' : 'font-medium text-white'}">${locket.caption}</span>
              </div>
            </div>
          ` : ''}
        </div>

        <div class="p-3 bg-zinc-950/60 border-t border-zinc-800/80 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            ${['❤️', '🔥', '😂', '😮'].map(emoji => `
              <button onclick="reactToLocket('${momentId}', '${emoji}', event)" class="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-zinc-800/70 hover:bg-zinc-700 text-sm transition transform active:scale-90">
                <span>${emoji}</span>
                <span class="text-xs font-semibold text-zinc-300">${(locket.reactions && locket.reactions[emoji]) || 0}</span>
              </button>
            `).join('')}
          </div>

          <button onclick="openReplyCamera('${locket.sender?.name || 'Friend'}')" class="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold rounded-full transition flex items-center gap-1">
            <span>Reply</span>
            <span>📸</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Rebind viewport auto-play intersection observer on feed refresh
  initFeedVideoObserver();
}

function filterByFriend(friendUsername) {
  if (!friendUsername) return;
  sfx.playPop();
  if (state.friendFilter === friendUsername) {
    state.friendFilter = null;
  } else {
    state.friendFilter = friendUsername;
    showToast(`Filtering for @${friendUsername} 🔍`);
  }
  renderFriendsChips();
  renderFeed();
}

function clearFriendFilter() {
  sfx.playPop();
  state.friendFilter = null;
  renderFriendsChips();
  renderFeed();
  showToast('Showing all moments 🌐');
}

async function openViewsModal(mid) {
  sfx.playPop();
  state.activeMomentForViews = mid;
  openModal('views-modal');

  const countEl = document.getElementById('modal-views-count');
  const listEl = document.getElementById('modal-viewers-list');
  if (countEl) countEl.innerText = 'Loading...';
  if (listEl) listEl.innerHTML = `<div class="p-3 text-center text-xs text-zinc-500">Fetching views...</div>`;

  try {
    const data = await LocketCloud.getViews(mid);
    const viewsData = data.data || data || {};
    const count = viewsData.count || (viewsData.moment_views ? viewsData.moment_views.length : 0);
    const viewers = viewsData.moment_views || [];

    if (countEl) countEl.innerText = count.toString();
    if (listEl) {
      if (viewers.length === 0) {
        listEl.innerHTML = `<div class="p-3 text-center text-xs text-zinc-500">No views registered yet.</div>`;
      } else {
        listEl.innerHTML = viewers.map(v => `
          <div class="flex items-center justify-between p-2 rounded-xl bg-zinc-900 border border-zinc-800">
            <span class="text-xs font-semibold text-white">Friend (${v.user ? v.user.slice(0, 8) : 'User'})</span>
            <span class="text-[10px] text-zinc-400">Viewed</span>
          </div>
        `).join('');
      }
    }
  } catch (err) {
    if (countEl) countEl.innerText = '0';
    if (listEl) listEl.innerHTML = `<div class="p-3 text-center text-xs text-zinc-500">Views tracked in realtime by Locket backend.</div>`;
  }
}

async function deleteCurrentMoment() {
  if (!state.activeMomentForViews) return;
  if (!confirm('Are you sure you want to delete this moment from Locket?')) return;

  try {
    await LocketCloud.deleteMoment(state.activeMomentForViews);
    showToast('Moment deleted from feed! 🗑️');
    closeModal('views-modal');
    await fetchLiveFeed();
  } catch (err) {
    showToast(`Error deleting moment: ${err.message}`);
  }
}

// --- VIDEO PLAYBACK SUBSYSTEM (Universal H.264 Player + Smart Viewport Auto-Play) ---
let feedVideoObserver = null;

function initFeedVideoObserver() {
  if (feedVideoObserver) {
    feedVideoObserver.disconnect();
  }

  // Auto-play videos when scrolled into the viewport (threshold 0.5 = at least 50% visible)
  // Auto-pause immediately when scrolled away
  feedVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const vid = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        // If user manually pressed pause on this video while viewing it, don't override until scrolled away
        if (vid.dataset.manualPaused === 'true') {
          return;
        }

        // Programmatic browser autoplay requirement: muted must be true unless unmuted by user gesture
        if (!vid.dataset.userUnmuted) {
          vid.muted = true;
        }

        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            // If browser blocked playback because of audio policy, enforce mute and retry smoothly
            vid.muted = true;
            const icon = vid.parentElement?.querySelector('.audio-icon');
            if (icon) icon.innerText = '🔇';
            vid.play().catch(() => {});
          });
        }
      } else {
        // Scrolled away / out of view: pause video immediately and clear manual pause state for next view
        delete vid.dataset.manualPaused;
        if (!vid.paused) {
          vid.pause();
        }
      }
    });
  }, {
    threshold: [0, 0.25, 0.5, 0.75],
    rootMargin: '0px'
  });

  const feedVideos = document.querySelectorAll('.feed-video-element');
  feedVideos.forEach(v => feedVideoObserver.observe(v));
}

function togglePlayVideo(videoId) {
  const vid = document.getElementById(videoId);
  if (!vid) return;

  if (vid.paused) {
    sfx.playPop();
    delete vid.dataset.manualPaused;

    // Pause any other playing feed videos to keep performance smooth
    document.querySelectorAll('.feed-video-element').forEach(v => {
      if (v !== vid && !v.paused) {
        v.pause();
      }
    });

    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Playback deferred / requires gesture:', err);
      });
    }
  } else {
    // User explicitly tapped to pause this video
    vid.dataset.manualPaused = 'true';
    vid.pause();
  }
}

function handleVideoPlayState(videoId, isPlaying) {
  const btn = document.getElementById(`play-btn-${videoId}`);
  if (!btn) return;
  if (isPlaying) {
    btn.classList.add('opacity-0', 'pointer-events-none');
  } else {
    btn.classList.remove('opacity-0', 'pointer-events-none');
  }
}

function toggleVideoMute(videoId, btnEl) {
  const vid = document.getElementById(videoId);
  if (!vid) return;
  sfx.playPop();

  vid.muted = !vid.muted;
  if (!vid.muted) {
    vid.dataset.userUnmuted = 'true';
  } else {
    delete vid.dataset.userUnmuted;
  }

  const icon = btnEl.querySelector('.audio-icon');
  if (icon) {
    icon.innerText = vid.muted ? '🔇' : '🔊';
  }
  showToast(vid.muted ? 'Muted 🔇' : 'Unmuted 🔊');
}

function renderRewindGrid() {
  const grid = document.getElementById('rewind-moments-grid');
  if (!grid) return;
  const moments = state.lockets.slice(0, 8);
  const countEl = document.getElementById('rewind-stat-count');
  if (countEl) countEl.innerText = `${moments.length} highlights`;

  grid.innerHTML = moments.map(m => `
    <div class="relative aspect-square rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-md group">
      <img src="${toCdnUrl(m.thumbnail_url || m.imageUrl)}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="handleImageError(this)">
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
        <span class="text-xs font-semibold text-white truncate drop-shadow">${m.sender?.name || m.user_name || 'Friend'}</span>
        ${m.caption ? `<span class="text-[10px] text-zinc-300 truncate">${m.caption}</span>` : ''}
      </div>
    </div>
  `).join('');
}

function openReplyCamera(friendName) {
  state.viewMode = 'app';
  toggleView('app');
  showToast(`Replying to ${friendName} 📸`);
}

function renderWidgets() {
  const latestLocket = state.lockets[0] || DEFAULT_LOCKETS[0];
  const secondLocket = state.lockets[1] || DEFAULT_LOCKETS[1];

  const smallWidget = document.getElementById('widget-small-preview');
  if (smallWidget) {
    smallWidget.className = `relative aspect-square rounded-[32px] overflow-hidden shadow-2xl transition duration-300 ${state.currentFrame}`;
    smallWidget.innerHTML = `
      <img src="${toCdnUrl(latestLocket.imageUrl)}" alt="Locket" class="w-full h-full object-cover" data-original-url="${latestLocket.imageUrl}" onerror="handleImageError(this)">
      <div class="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-2">
        <img src="${toCdnUrl(latestLocket.sender.avatar)}" alt="${latestLocket.sender.name}" class="w-7 h-7 rounded-full object-cover border border-white/50 shadow" onerror="handleImageError(this)">
        <div class="glass-pill px-2.5 py-1 rounded-full truncate">
          <span class="text-[11px] font-semibold text-white truncate">${latestLocket.sender.name.split(' ')[0]} • ${latestLocket.timestamp}</span>
        </div>
      </div>
    `;
    smallWidget.classList.add('widget-updated');
    setTimeout(() => smallWidget.classList.remove('widget-updated'), 500);
  }

  const medWidget = document.getElementById('widget-medium-preview');
  if (medWidget) {
    medWidget.className = `relative h-[165px] rounded-[32px] overflow-hidden shadow-2xl p-2.5 grid grid-cols-2 gap-2.5 bg-zinc-900 border border-zinc-800 ${state.currentFrame}`;
    medWidget.innerHTML = `
      <div class="relative h-full rounded-[22px] overflow-hidden">
        <img src="${toCdnUrl(latestLocket.imageUrl)}" alt="Locket" class="w-full h-full object-cover" data-original-url="${latestLocket.imageUrl}" onerror="handleImageError(this)">
        <div class="absolute bottom-2 left-2 flex items-center gap-1.5">
          <img src="${toCdnUrl(latestLocket.sender.avatar)}" class="w-6 h-6 rounded-full border border-white/60" onerror="handleImageError(this)">
          <span class="glass-pill px-2 py-0.5 rounded-full text-[10px] text-white font-medium">${latestLocket.sender.name.split(' ')[0]}</span>
        </div>
      </div>
      <div class="relative h-full rounded-[22px] overflow-hidden">
        <img src="${toCdnUrl(secondLocket.imageUrl)}" alt="Locket" class="w-full h-full object-cover" data-original-url="${secondLocket.imageUrl}" onerror="handleImageError(this)">
        <div class="absolute bottom-2 left-2 flex items-center gap-1.5">
          <img src="${toCdnUrl(secondLocket.sender.avatar)}" class="w-6 h-6 rounded-full border border-white/60" onerror="handleImageError(this)">
          <span class="glass-pill px-2 py-0.5 rounded-full text-[10px] text-white font-medium">${secondLocket.sender.name.split(' ')[0]}</span>
        </div>
      </div>
    `;
  }
}

function renderFriendsChips() {
  const container = document.getElementById('recipient-chips-container');
  if (!container) return;

  const totalStreak = state.friends.reduce((acc, f) => acc + (f.streak || 0), 0);

  let html = `
    <button onclick="setRecipient('all')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${state.activeRecipient === 'all' ? 'bg-yellow-400 text-black shadow-md' : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'}">
      <span>All Friends (${state.friends.length})</span>
      <span class="text-xs">🔥${totalStreak}</span>
    </button>
  `;

  state.friends.forEach(friend => {
    const isSelected = state.activeRecipient === friend.id;
    html += `
      <button onclick="setRecipient('${friend.id}')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${isSelected ? 'bg-yellow-400 text-black shadow-md' : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'}">
        <img src="${toCdnUrl(friend.avatar)}" class="w-4 h-4 rounded-full object-cover" onerror="handleImageError(this)">
        <span>${friend.name.split(' ')[0]}</span>
        <span class="text-xs text-orange-400">🔥${friend.streak}</span>
      </button>
    `;
  });

  container.innerHTML = html;
}

function setRecipient(id) {
  state.activeRecipient = id;
  renderFriendsChips();
  const label = id === 'all' ? 'All Friends' : state.friends.find(f => f.id === id)?.name;
  showToast(`Sharing directly to ${label} ⚡️`);
}

function renderIconsGrid() {
  const grid = document.getElementById('locket-icons-grid');
  if (!grid) return;

  grid.innerHTML = LOCKET_ICONS.map(icon => {
    const isSelected = state.currentIcon === icon.file;
    return `
      <button onclick="selectAppIcon('${icon.file}')" class="flex flex-col items-center p-2 rounded-2xl transition border ${isSelected ? 'border-yellow-400 bg-yellow-400/10' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900'}">
        <div class="relative w-14 h-14 rounded-2xl overflow-hidden shadow-md mb-2">
          <img src="assets/icons/${icon.file}" alt="${icon.name}" class="w-full h-full object-cover">
          ${isSelected ? `
            <div class="absolute inset-0 bg-yellow-400/20 border-2 border-yellow-400 rounded-2xl flex items-center justify-center">
              <span class="text-xs bg-yellow-400 text-black font-bold px-1.5 py-0.5 rounded-full">✓</span>
            </div>
          ` : ''}
        </div>
        <span class="text-xs font-medium text-white truncate max-w-[80px]">${icon.name}</span>
        <span class="text-[10px] text-zinc-400">${icon.tag}</span>
      </button>
    `;
  }).join('');
}

function selectAppIcon(filename) {
  sfx.playGoldChime();
  state.currentIcon = filename;
  localStorage.setItem('locket_icon', filename);
  applySelectedIcon(filename);
  renderIconsGrid();
  showToast('App icon updated to Locket Gold theme! 🌟');
}

function applySelectedIcon(filename) {
  const headerLogo = document.getElementById('header-app-logo');
  if (headerLogo) {
    headerLogo.src = 'assets/icons/' + filename;
  }
  const favicon = document.getElementById('dynamic-favicon');
  if (favicon) {
    favicon.href = 'assets/icons/' + filename;
  }
}

function selectFrame(frameClass) {
  sfx.playPop();
  state.currentFrame = frameClass;
  localStorage.setItem('locket_frame', frameClass);
  renderWidgets();
  showToast('Widget frame styled! 🎨');
}

function openModal(id) {
  sfx.playPop();
  if (id === 'rewind-modal') {
    renderRewindGrid();
  }
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('hidden');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('hidden');
}

function toggleView(mode) {
  sfx.playPop();
  state.viewMode = mode;
  const appSection = document.getElementById('app-camera-view');
  const widgetSection = document.getElementById('home-screen-view');
  const btnApp = document.getElementById('view-toggle-app');
  const btnWidget = document.getElementById('view-toggle-widget');

  if (mode === 'app') {
    appSection?.classList.remove('hidden');
    widgetSection?.classList.add('hidden');
    btnApp?.classList.add('bg-yellow-400', 'text-black');
    btnApp?.classList.remove('text-zinc-400');
    btnWidget?.classList.remove('bg-yellow-400', 'text-black');
    btnWidget?.classList.add('text-zinc-400');
    initFeedVideoObserver();
  } else {
    appSection?.classList.add('hidden');
    widgetSection?.classList.remove('hidden');
    btnWidget?.classList.add('bg-yellow-400', 'text-black');
    btnWidget?.classList.remove('text-zinc-400');
    btnApp?.classList.remove('bg-yellow-400', 'text-black');
    btnApp?.classList.add('text-zinc-400');
    // Pause all feed videos when switching to widget view
    document.querySelectorAll('.feed-video-element').forEach(v => {
      if (!v.paused) v.pause();
    });
  }
}

// Pause videos when browser tab is hidden/minimized
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.querySelectorAll('.feed-video-element').forEach(v => {
      if (!v.paused) v.pause();
    });
  }
});

async function addNewFriend() {
  const input = document.getElementById('new-friend-username');
  if (!input) return;
  const username = input.value.trim().replace(/^@/, '');
  if (!username) return;

  sfx.playPop();

  if (state.isAuthenticated) {
    try {
      await LocketCloud.addFriend(username);
      showToast(`Sent friend request to @${username}! 🤝`);
      await fetchLiveFriends();
      input.value = '';
      return;
    } catch (err) {
      showToast(`Friend request error: ${err.message}`);
    }
  }

  const newFriend = {
    id: 'f_' + Date.now(),
    name: username.charAt(0).toUpperCase() + username.slice(1),
    username: username,
    avatar: AESTHETIC_PRESETS[Math.floor(Math.random() * AESTHETIC_PRESETS.length)],
    streak: 1,
    lastActive: 'Just added'
  };

  state.friends.push(newFriend);
  saveState();
  renderFriendsChips();
  renderFriendsListModal();
  input.value = '';
  showToast(`Added @${username} to your Locket! 🔥`);
}

function renderFriendsListModal() {
  const container = document.getElementById('friends-modal-list');
  if (!container) return;

  container.innerHTML = state.friends.map(f => `
    <div class="flex items-center justify-between p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
      <div class="flex items-center gap-3">
        <img src="${toCdnUrl(f.avatar)}" alt="${f.name}" class="w-10 h-10 rounded-full object-cover border border-zinc-700" data-original-url="${f.avatar}" onerror="handleImageError(this)">
        <div>
          <h4 class="text-sm font-semibold text-white leading-tight">${f.name}</h4>
          <p class="text-xs text-zinc-400">@${f.username} • ${f.lastActive}</p>
        </div>
      </div>
      <div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold text-xs">
        <span>🔥</span>
        <span>${f.streak} days</span>
      </div>
    </div>
  `).join('');
}

function copyInviteLink() {
  sfx.playPop();
  navigator.clipboard.writeText('https://locket.cam/dj_creator');
  showToast('Invite link copied to clipboard! 📋');
}

function showToast(msg) {
  const toast = document.getElementById('app-toast');
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
  }, 2200);
}

function saveState() {
  localStorage.setItem('locket_friends', JSON.stringify(state.friends));
  localStorage.setItem('locket_feed', JSON.stringify(state.lockets));
}

function initUI() {
  renderFriendsListModal();
}
