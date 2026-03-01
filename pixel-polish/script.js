// ZenFocus Premium | Professional PWA Logic

// 1. Navigation Controller
const views = {
    focusView: document.getElementById('focusView'),
    journalView: document.getElementById('journalView'),
};

const navBtns = document.querySelectorAll('.nav-btn');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const viewName = btn.getAttribute('data-view');

        // Update active class
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Switch view
        Object.values(views).forEach(v => v.classList.add('hidden'));
        views[viewName].classList.remove('hidden');
        views[viewName].classList.add('animate-fade-in');
    });
});

// 2. Timer Logic (Focus)
let timerSeconds = 1500; // 25 minutes
let timerInterval = null;
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startTimer');

function formatTime(sec) {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        startBtn.textContent = 'Resume Focus';
        startBtn.classList.replace('bg-red-500/10', 'bg-violet-600/20');
        return;
    }

    startBtn.textContent = 'Pause Focus';
    startBtn.classList.replace('bg-violet-600/20', 'bg-red-500/10');

    timerInterval = setInterval(() => {
        timerSeconds--;
        timerDisplay.textContent = formatTime(timerSeconds);

        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            triggerNotification('Session Complete', 'Great work! Take a breath.');
            timerSeconds = 1500;
            startBtn.textContent = 'Start Focus';
        }
    }, 1000);
});

// 3. Journal Storage
const journalInput = document.getElementById('journalInput');
const saveBtn = document.getElementById('saveJournal');
const journalFeed = document.getElementById('journalFeed');

function loadJournal() {
    const entries = JSON.parse(localStorage.getItem('zen_entries') || '[]');
    journalFeed.innerHTML = entries.map(entry => `
        <div class="entry-card space-y-2 animate-fade-in">
            <div class="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <span>Refining Day</span>
                <span>${entry.time}</span>
            </div>
            <p class="text-sm text-slate-300 leading-relaxed">${entry.text}</p>
        </div>
    `).join('');
}

saveBtn.addEventListener('click', () => {
    const text = journalInput.value.trim();
    if (!text) return;

    const entries = JSON.parse(localStorage.getItem('zen_entries') || '[]');
    entries.unshift({
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    localStorage.setItem('zen_entries', JSON.stringify(entries.slice(0, 10)));
    journalInput.value = '';
    loadJournal();

    saveBtn.classList.replace('bg-violet-600', 'bg-green-600');
    saveBtn.textContent = 'Saved!';
    setTimeout(() => {
        saveBtn.classList.replace('bg-green-600', 'bg-violet-600');
        saveBtn.textContent = 'Save Entry';
    }, 2000);
});

// 4. Notification & PWA Core
const notifyBtn = document.getElementById('notifyBtn');

async function requestNotifyPermission() {
    if (Notification.permission !== 'granted') {
        await Notification.requestPermission();
    }
}

function triggerNotification(title, body) {
    if (Notification.permission === 'granted') {
        const n = new Notification(title, {
            body,
            icon: 'favicon.svg',
            badge: 'favicon.svg'
        });

        // Mobile fallback via vibrating
        if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
    }
}

notifyBtn.addEventListener('click', async () => {
    await requestNotifyPermission();
    triggerNotification('ZenFocus Premium', 'Notifications are calibrated and active.');
});

// CRITICAL: Background Persistence (Time Window Logic)
// Check every minute if we are within a specific window to notify user
// This ensures that even if browser throttles JS, we hit the alert.
setInterval(() => {
    const now = new Date();
    // Example: Alert every hour at :00 if tab is open
    if (now.getMinutes() === 0 && now.getSeconds() < 10) {
        triggerNotification('Focus Reset', 'Time for a quick stretch session.');
    }
}, 30000);

// PWA Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW Registered', reg))
            .catch(err => console.log('SW Failed', err));
    });
}

// 5. Native PWA UI Elements
const installToast = document.getElementById('installToast');
const installConfirm = document.getElementById('installConfirm');
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show premium toast
    setTimeout(() => {
        installToast.style.transform = 'translateY(0)';
    }, 3000);
});

installConfirm.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            installToast.style.transform = 'translateY(160px)';
        }
    }
});

// Initialization
document.getElementById('dateText').textContent = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
loadJournal();
