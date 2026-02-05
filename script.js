const blocksByMajor = {
    CS: ["CS1", "CS2", "CS3"],
    IT: ["IT1", "IT2", "IT3"],
    IS: ["IS1", "IS2", "IS3"]
};

const termSubjects = {
    CS: {
        4: ['CPCS-203', 'CPCS-222'],
        5: ['CPCS-204', 'CPCS-211', 'CPCS-212'],
        6: ['CPCS-214', 'CPCS-223', 'CPCS-241', 'CPCS-301'],
        7: ['CPCS-324', 'CPCS-351', 'CPCS-331', 'CPCS-361', 'CPCS-371'],
        8: ['CPCS-302', 'CPCS-381', 'CPCS-391'],
        9: [],
        10: ['CPIS-428']
    },
    IT: {
        4: ['CPCS-203', 'CPCS-222', 'CPIT-220'],
        5: ['CPCS-204', 'CPIT-210'],
        6: ['CPIT-240', 'CPIT-250', 'CPIT-260', 'CPIT-285'],
        7: ['CPIT-251', 'CPIT-280', 'CPIT-370', 'CPIS-393'],
        8: ['CPIT-252', 'CPIT-330', 'CPIT-380', 'CPIT-305', 'CPIT-425'],
        9: ['CPIT-405', 'CPIT-345'],
        10: ['CPIT-435', 'CPIT-470']
    },
    IS: {
        4: ['CPCS-203', 'CPIS-220'],
        5: ['CPCS-204', 'CPCS-222', 'CPIS-210'],
        6: ['CPIS-222', 'CPIS-240', 'CPIS-334', 'CPIS-250', 'CPIS-370'],
        7: ['CPIS-351', 'CPIS-354', 'CPIS-358', 'CPIS-357'],
        8: ['CPIS-312', 'CPIS-352', 'CPIS-380', 'CPIS-393'],
        9: ['CPIS-428', 'CPIS-342'],
        10: ['CPIS-434']
    }
};

const alwaysSuggested = {
    CS: {
        4: ['ARAB-101', 'ISLS-201', 'MATH-202'],
        5: ['PHYS-202', 'CHEM-202', 'BIO-202', 'BIOC-371'],
        6: ['STAT-352'],
        7: ['CPIS-334'],
        8: ['ISLS-301', 'CPIS-393'],
        9: ['ARAB-201', 'CPCS-498'],
        10: ['CPCS-499', 'ISLS-401']
    },
    IT: {
        4: ['ARAB-101', 'ISLS-201'],
        5: ['ISLS-301', 'ARAB-201'],
        6: [],
        7: ['ISLS-401'],
        8: ['CPIS-334'],
        9: ['CPIT-498'],
        10: ['CPIT-499', 'CPIS-428']
    },
    IS: {
        4: ['BUS-232', 'ARAB-101', 'ISLS-201'],
        5: ['MRKT-260'],
        6: [],
        7: ['ACCT-333'],
        8: ['ARAB-201'],
        9: ['CPIS-498', 'ISLS-301'],
        10: ['CPIS-499', 'ISLS-401']
    }
};

// Female-specific course lists (temporary - can be customized)
const termSubjectsFemale = {
    CS: {
        4: ['CPCS-203', 'CPCS-222'],
        5: ['CPCS-204', 'CPCS-211', 'CPCS-212'],
        6: ['CPCS-214', 'CPCS-223', 'CPCS-241', 'CPCS-301'],
        7: ['CPCS-324', 'CPCS-351', 'CPCS-331', 'CPCS-361', 'CPCS-371'],
        8: ['CPCS-302', 'CPCS-381', 'CPCS-391'],
        9: [],
        10: ['CPIS-428']
    },
    IT: {
        4: ['CPCS-203', 'CPCS-222', 'CPIT-220'],
        5: ['CPCS-204', 'CPIT-210'],
        6: ['CPIT-240', 'CPIT-250', 'CPIT-260', 'CPIT-285'],
        7: ['CPIT-251', 'CPIT-280', 'CPIT-370', 'CPIS-393'],
        8: ['CPIT-252', 'CPIT-330', 'CPIT-380', 'CPIT-305', 'CPIT-425', 'CPIS-334'],
        9: ['CPIT-405', 'CPIT-345'],
        10: ['CPIT-435']
    },
    IS: {
        4: ['CPCS-222', 'CPCS-203', 'CPIS-220'],
        5: ['CPCS-204', 'CPIS-210'],
        6: ['CPIS-222', 'CPIS-240', 'CPIS-250', 'CPIS-370'],
        7: ['CPIS-351', 'CPIS-354', 'CPIS-358', 'CPIS-393', 'CPIS-334'],
        8: ['CPIS-357', 'CPIS-312', 'CPIS-352', 'CPIS-380'],
        9: ['CPIS-428', 'CPIS-342'],
        10: ['CPIS-434']
    }
};

const alwaysSuggestedFemale = {
    CS: {
        4: ['ARAB-101', 'ISLS-201', 'MATH-202'],
        5: ['PHYS-202', 'CHEM-202', 'BIO-202', 'BIOC-371'],
        6: ['STAT-352'],
        7: ['CPIS-334'],
        8: ['ISLS-301', 'CPIS-393'],
        9: ['ARAB-201', 'CPCS-498'],
        10: ['CPCS-499', 'ISLS-401']
    },
    IT: {
        4: ['ARAB-101', 'ISLS-201'],
        5: ['ISLS-301', 'ARAB-201'],
        6: ['CPIT-210', 'CPIT-220', 'CPIS-334'],
        7: ['ISLS-401', 'CPIT-210', 'CPIT-220', 'CPIT-260', 'CPIT-340', 'CPIT-456', 'CPIT-380'],
        8: ['CPIT-240'],
        9: ['CPIT-498', 'CPIS-393', 'CPIT-456', 'CPIT-425'],
        10: ['CPIT-499', 'CPIS-428', 'CPIT-470', 'CPIT-260', 'CPIT-340', 'CPIT-456', 'CPIT-380']
    },
    IS: {
        4: ['BUS-232', 'ARAB-101', 'ISLS-201'],
        5: ['MRKT-260'],
        6: ['ACCT-333'],
        7: [],
        8: ['ARAB-201'],
        9: ['CPIS-498', 'ISLS-301'],
        10: ['CPIS-499', 'ISLS-401']
    }
};

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
const DAY_MAP = { U: 'Sunday', M: 'Monday', T: 'Tuesday', W: 'Wednesday', R: 'Thursday' };
const DAY_ORDER = { U: 0, M: 1, T: 2, W: 3, R: 4 };
const PIXELS_PER_HOUR = 80;
const TIME_PADDING_HOURS = 1;

let currentMajor = null;
let currentTerm = null;
let currentTimeRange = { startHour: 8, endHour: 17 };
let undoStack = [];
let undoTimeout = null;

// ==========================================
// FORM PERSISTENCE
// ==========================================

let isRestoring = false;

function saveFormState() {
    // Don't save during restore to prevent overwriting with empty dependent values
    if (isRestoring) return;

    const state = {
        gender: document.getElementById('gender')?.value || '',
        year: document.getElementById('year')?.value || '',
        term: document.getElementById('term')?.value || '',
        major: document.getElementById('major')?.value || '',
        block: document.getElementById('block')?.value || ''
    };
    localStorage.setItem('formState', JSON.stringify(state));
}

function restoreFormState() {
    const saved = localStorage.getItem('formState');
    if (!saved) return;

    isRestoring = true; // Prevent saveFormState from being called during restore

    try {
        const state = JSON.parse(saved);

        // Step 1: Restore gender and dispatch change to trigger block disable for female
        if (state.gender) {
            const genderEl = document.getElementById('gender');
            genderEl.value = state.gender;
            genderEl.dispatchEvent(new Event('change'));
        }

        // Step 2: Restore year (triggers term dropdown population)
        setTimeout(() => {
            if (state.year) {
                const yearEl = document.getElementById('year');
                yearEl.value = state.year;
                yearEl.dispatchEvent(new Event('change'));
            }

            // Step 3: Restore major (triggers block dropdown population)
            setTimeout(() => {
                if (state.major) {
                    const majorEl = document.getElementById('major');
                    majorEl.value = state.major;
                    currentMajor = state.major;
                    majorEl.dispatchEvent(new Event('change'));
                }

                // Step 4: Restore term (after year's change event populated it)
                setTimeout(() => {
                    if (state.term) {
                        document.getElementById('term').value = state.term;
                        currentTerm = state.term;
                    }

                    // Step 5: Restore block (only for male - female gets "Coming Soon")
                    setTimeout(() => {
                        const blockSelect = document.getElementById('block');
                        if (state.gender === 'female') {
                            blockSelect.innerHTML = '<option value="female-mode" selected>Coming Soon</option>';
                            blockSelect.disabled = true;
                        } else if (state.block) {
                            blockSelect.value = state.block;
                        }
                        isRestoring = false; // Re-enable saving
                    }, 50);
                }, 50);
            }, 50);
        }, 50);
    } catch (e) {
        console.warn('Could not restore form state');
        isRestoring = false;
    }
}

// ==========================================
// SCHEDULE PERSISTENCE
// ==========================================

function saveScheduleState() {
    const crns = [];
    document.querySelectorAll('.course-box').forEach(box => {
        if (box.courseData && !crns.includes(box.courseData.crn)) {
            crns.push(box.courseData.crn);
        }
    });

    const isOnSchedule = document.querySelector('section').style.display === 'block';

    const state = {
        crns: crns,
        isOnSchedule: isOnSchedule
    };
    localStorage.setItem('scheduleState', JSON.stringify(state));
}

// Custom Course Persistence
function getCustomCourses() {
    try {
        return JSON.parse(localStorage.getItem('customCourses') || '[]');
    } catch { return []; }
}

function saveCustomCourse(course) {
    const current = getCustomCourses();
    current.push(course);
    localStorage.setItem('customCourses', JSON.stringify(current));
}

function removeCustomCourse(code) {
    const current = getCustomCourses();
    const filtered = current.filter(c => c.courseCode !== code);
    localStorage.setItem('customCourses', JSON.stringify(filtered));
}

function getCustomCourseByCrn(crn) {
    const current = getCustomCourses();
    return current.find(c => c.crn === crn);
}

async function restoreScheduleState() {
    const saved = localStorage.getItem('scheduleState');
    if (!saved) return;

    try {
        const state = JSON.parse(saved);

        if (!state.isOnSchedule || state.crns.length === 0) return;

        const gender = document.getElementById('gender').value;

        // Show schedule view
        displayCourses([]);

        // Fetch each course by CRN and add to grid
        for (const crn of state.crns) {
            try {
                // Check if it's a saved custom course first (by CRN)
                const custom = getCustomCourseByCrn(crn);
                if (custom) {
                    addCourseToGrid(custom);
                } else {
                    // Otherwise try API
                    const url = `https://api.kauindex.com/search?termCode=202602&crn=${crn}&gender=${gender}&limit=1`;
                    const res = await fetch(url);
                    const json = await res.json();

                    if (json.status === 'success' && json.data.length > 0) {
                        addCourseToGrid(json.data[0]);
                    }
                }
            } catch (err) {
                console.warn(`Could not restore course CRN ${crn}`);
            }
        }

        updateSuggestedCourses();
    } catch (e) {
        console.warn('Could not restore schedule state');
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Fetch with timeout to prevent infinite loading when API is down
async function fetchWithTimeout(url, options = {}, timeout = 15000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        // Create a custom error with a flag for easy identification
        const networkError = new Error(
            error.name === 'AbortError'
                ? 'Request timed out after 15 seconds.'
                : 'Network connection failed. Server may be unavailable.'
        );
        networkError.isNetworkError = true;
        networkError.originalError = error;
        throw networkError;
    }
}

function formatCourseCode(subject, code) {
    if (!subject || subject === '') return code;
    return `${subject}-${code}`;
}

function parseTime(timeStr) {
    const [time, ampm] = timeStr.split(' ');
    let [hour, min] = time.split(':').map(Number);
    if (ampm === 'PM' && hour < 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    return (hour * 60) + min;
}

function parseScheduleTime(schedule) {
    const timeMatch = schedule.time.match(/(\d{1,2}:\d{2} [AP]M) - (\d{1,2}:\d{2} [AP]M)/);
    if (!timeMatch) return null;
    const startMin = parseTime(timeMatch[1]);
    const endMin = parseTime(timeMatch[2]);
    if (isNaN(startMin) || isNaN(endMin)) return null;
    return { ...schedule, startMin, endMin };
}

function timeRangesOverlap(start1, end1, start2, end2) {
    return start1 < end2 && start2 < end1;
}

function formatDays(days) {
    const dayNames = { U: 'Sun', M: 'Mon', T: 'Tue', W: 'Wed', R: 'Thu' };
    return days.split('').sort((a, b) => (DAY_ORDER[a] ?? 99) - (DAY_ORDER[b] ?? 99))
        .map(d => dayNames[d] || d).join(', ');
}

// Modal management helper to handle scroll locking
function closeModal(id) {
    document.getElementById(id).style.display = 'none';

    // Only unlock scroll if NO other modals are open
    const modals = ['modal', 'detailsModal', 'confirmModal'];
    const anyOpen = modals.some(mId => {
        const el = document.getElementById(mId);
        return el && el.style.display === 'flex';
    });

    if (!anyOpen) {
        document.body.classList.remove('modal-open');
    }
}

// Show Confirmation Modal (Async)
function showConfirmModal(title, message) {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirmModal');
        const titleEl = document.getElementById('confirmTitle');
        const messageEl = document.getElementById('confirmMessage');
        const yesBtn = document.getElementById('confirmYes');
        const noBtn = document.getElementById('confirmNo');

        titleEl.textContent = title;
        messageEl.textContent = message;

        modal.style.display = 'flex';
        document.body.classList.add('modal-open');

        const cleanup = () => {
            closeModal('confirmModal');
            yesBtn.onclick = null;
            noBtn.onclick = null;
        };

        yesBtn.onclick = () => { cleanup(); resolve(true); };
        noBtn.onclick = () => { cleanup(); resolve(false); };
    });
}

// Calculate dynamic time range - Up to 2 AM (26)
function calculateTimeRange(courses) {
    let earliestMin = 24 * 60;
    let latestMin = 0;
    let hasItems = false;

    courses.forEach(course => {
        course.schedules.forEach(schedule => {
            const parsed = parseScheduleTime(schedule);
            if (!parsed) return;
            hasItems = true;
            earliestMin = Math.min(earliestMin, parsed.startMin);
            latestMin = Math.max(latestMin, parsed.endMin);
        });
    });

    if (typeof addedTasks !== 'undefined') {
        addedTasks.forEach(task => {
            const [h1, m1] = task.startTime.split(':').map(Number);
            const [h2, m2] = task.endTime.split(':').map(Number);
            const start = h1 * 60 + m1;
            const end = h2 * 60 + m2;
            hasItems = true;
            earliestMin = Math.min(earliestMin, start);
            latestMin = Math.max(latestMin, end);
        });
    }

    if (!hasItems) return { startHour: 8, endHour: 17 };

    const startHour = Math.max(7, Math.floor(earliestMin / 60) - TIME_PADDING_HOURS);
    // Allow ending up to 02:00 AM (26 * 60)
    const endHour = Math.min(26, Math.ceil(latestMin / 60) + TIME_PADDING_HOURS);

    return { startHour, endHour };
}

// ==========================================
// SCHEDULE PERSISTENCE
// ==========================================

function saveScheduleState() {
    const crns = [];
    document.querySelectorAll('.course-box').forEach(box => {
        if (box.courseData && !crns.includes(box.courseData.crn)) {
            crns.push(box.courseData.crn);
        }
    });

    const isOnSchedule = document.querySelector('section').style.display === 'block';

    const state = {
        crns: crns,
        isOnSchedule: isOnSchedule
    };
    localStorage.setItem('scheduleState', JSON.stringify(state));
}

// Custom Course Persistence
function getCustomCourses() {
    try {
        return JSON.parse(localStorage.getItem('customCourses') || '[]');
    } catch { return []; }
}

function saveCustomCourse(course) {
    const current = getCustomCourses();
    current.push(course);
    localStorage.setItem('customCourses', JSON.stringify(current));
}

function removeCustomCourse(code) {
    const current = getCustomCourses();
    const filtered = current.filter(c => c.courseCode !== code);
    localStorage.setItem('customCourses', JSON.stringify(filtered));
}

function getCustomCourseByCrn(crn) {
    const current = getCustomCourses();
    return current.find(c => c.crn === crn);
}

async function restoreScheduleState() {
    const saved = localStorage.getItem('scheduleState');
    if (!saved) return;

    try {
        const state = JSON.parse(saved);

        if (!state.isOnSchedule || state.crns.length === 0) return;

        const gender = document.getElementById('gender').value;

        // Show schedule view
        displayCourses([]);

        // Fetch each course by CRN and add to grid
        for (const crn of state.crns) {
            try {
                // Check if it's a saved custom course first (by CRN)
                const custom = getCustomCourseByCrn(crn);
                if (custom) {
                    addCourseToGrid(custom);
                } else {
                    // Otherwise try API
                    const url = `https://api.kauindex.com/search?termCode=202602&crn=${crn}&gender=${gender}&limit=1`;
                    const res = await fetch(url);
                    const json = await res.json();

                    if (json.status === 'success' && json.data.length > 0) {
                        addCourseToGrid(json.data[0]);
                    }
                }
            } catch (err) {
                console.warn(`Could not restore course CRN ${crn}`);
            }
        }

        updateSuggestedCourses();
    } catch (e) {
        console.warn('Could not restore schedule state');
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Fetch with timeout to prevent infinite loading when API is down
async function fetchWithTimeout(url, options = {}, timeout = 15000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        // Create a custom error with a flag for easy identification
        const networkError = new Error(
            error.name === 'AbortError'
                ? 'Request timed out after 15 seconds.'
                : 'Network connection failed. Server may be unavailable.'
        );
        networkError.isNetworkError = true;
        networkError.originalError = error;
        throw networkError;
    }
}

function formatCourseCode(subject, code) {
    if (!subject || subject === '') return code;
    return `${subject}-${code}`;
}

function parseTime(timeStr) {
    const [time, ampm] = timeStr.split(' ');
    let [hour, min] = time.split(':').map(Number);
    if (ampm === 'PM' && hour < 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    return (hour * 60) + min;
}

function parseScheduleTime(schedule) {
    const timeMatch = schedule.time.match(/(\d{1,2}:\d{2} [AP]M) - (\d{1,2}:\d{2} [AP]M)/);
    if (!timeMatch) return null;
    const startMin = parseTime(timeMatch[1]);
    const endMin = parseTime(timeMatch[2]);
    if (isNaN(startMin) || isNaN(endMin)) return null;
    return { ...schedule, startMin, endMin };
}

function timeRangesOverlap(start1, end1, start2, end2) {
    return start1 < end2 && start2 < end1;
}

function formatDays(days) {
    const dayNames = { U: 'Sun', M: 'Mon', T: 'Tue', W: 'Wed', R: 'Thu' };
    return days.split('').sort((a, b) => (DAY_ORDER[a] ?? 99) - (DAY_ORDER[b] ?? 99))
        .map(d => dayNames[d] || d).join(', ');
}

// Modal management helper to handle scroll locking
function closeModal(id) {
    document.getElementById(id).style.display = 'none';

    // Only unlock scroll if NO other modals are open
    const modals = ['modal', 'detailsModal', 'confirmModal'];
    const anyOpen = modals.some(mId => {
        const el = document.getElementById(mId);
        return el && el.style.display === 'flex';
    });

    if (!anyOpen) {
        document.body.classList.remove('modal-open');
    }
}

// Show Confirmation Modal (Async)
function showConfirmModal(title, message) {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirmModal');
        const titleEl = document.getElementById('confirmTitle');
        const messageEl = document.getElementById('confirmMessage');
        const yesBtn = document.getElementById('confirmYes');
        const noBtn = document.getElementById('confirmNo');

        titleEl.textContent = title;
        messageEl.textContent = message;

        modal.style.display = 'flex';
        document.body.classList.add('modal-open');

        const cleanup = () => {
            closeModal('confirmModal');
            yesBtn.onclick = null;
            noBtn.onclick = null;
        };

        yesBtn.onclick = () => { cleanup(); resolve(true); };
        noBtn.onclick = () => { cleanup(); resolve(false); };
    });
}

// Calculate dynamic time range - Up to 2 AM (26)
function calculateTimeRange(courses) {
    let earliestMin = 24 * 60;
    let latestMin = 0;
    let hasItems = false;

    courses.forEach(course => {
        course.schedules.forEach(schedule => {
            const parsed = parseScheduleTime(schedule);
            if (!parsed) return;
            hasItems = true;
            earliestMin = Math.min(earliestMin, parsed.startMin);
            latestMin = Math.max(latestMin, parsed.endMin);
        });
    });

    if (typeof addedTasks !== 'undefined') {
        addedTasks.forEach(task => {
            const [h1, m1] = task.startTime.split(':').map(Number);
            const [h2, m2] = task.endTime.split(':').map(Number);
            const start = h1 * 60 + m1;
            const end = h2 * 60 + m2;
            hasItems = true;
            earliestMin = Math.min(earliestMin, start);
            latestMin = Math.max(latestMin, end);
        });
    }

    if (!hasItems) return { startHour: 8, endHour: 17 };

    const startHour = Math.max(7, Math.floor(earliestMin / 60) - TIME_PADDING_HOURS);
    // Allow ending up to 02:00 AM (26 * 60)
    const endHour = Math.min(26, Math.ceil(latestMin / 60) + TIME_PADDING_HOURS);

    return { startHour, endHour };
}

// ==========================================
// COURSE MANAGEMENT & UNDO
// ==========================================

function removeCourse(courseCode) {
    const boxes = document.querySelectorAll(`.course-box[data-course-code="${courseCode}"]`);
    if (boxes.length === 0) return;

    // Save for undo
    const courseData = boxes[0].courseData;
    undoStack.push(courseData);

    // Remove from grid
    document.querySelectorAll(`.course-box[data-course-code="${courseCode}"]`).forEach(b => b.remove());

    // Remove from custom storage if custom
    if (courseData.isCustom) {
        removeCustomCourse(courseCode);
    }

    // Regenerate mobile list to remove empty day groups
    const container = document.getElementById('timetableContainer');
    if (container) {
        const allCourses = getAllCoursesFromGrid();
        generateMobileScheduleList(allCourses, container);
        // generateMobileGridView(allCourses, document.querySelector('.mobile-schedule-grid'));
    }

    updateSuggestedCourses();
    showToast(`Removed ${courseCode}`);
    saveScheduleState();
    refreshSchedule(); // Refresh to update display and credits
}

async function restoreLastCourse() {
    const course = undoStack.pop();
    if (course) {
        // Use handleCourseAddition to check for conflicts during undo
        await handleCourseAddition(course, true);

        const toast = document.getElementById('toast');
        toast.classList.add('hidden');
        toast.classList.remove('toast-exit');
        updateSuggestedCourses();
    }
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toastMessage');

    if (undoTimeout) clearTimeout(undoTimeout);

    msgEl.textContent = msg;
    toast.classList.remove('hidden', 'toast-exit');

    document.getElementById('undoBtn').onclick = restoreLastCourse;

    undoTimeout = setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 3000);
}

// ==========================================
// CONFLICT & ADD LOGIC (Recursive)
// ==========================================

function findConflict(newCourse) {
    const existingCourses = getCoursesOnGrid();
    const existingFullData = getAllCoursesFromGrid();

    const newCourseCode = formatCourseCode(newCourse.subject, newCourse.courseCode);

    if (existingCourses.includes(newCourseCode)) {
        return { type: 'same', code: newCourseCode };
    }

    for (const s of newCourse.schedules) {
        const parsedS = parseScheduleTime(s);
        if (!parsedS) continue;
        const myDays = parsedS.days.split('');

        for (const existing of existingFullData) {
            for (const eSched of existing.schedules) {
                const parsedE = parseScheduleTime(eSched);
                if (!parsedE) continue;
                const dayOverlap = myDays.some(d => parsedE.days.includes(d));
                if (dayOverlap && timeRangesOverlap(parsedS.startMin, parsedS.endMin, parsedE.startMin, parsedE.endMin)) {
                    const conflictCode = formatCourseCode(existing.subject, existing.courseCode);
                    return { type: 'time', code: conflictCode };
                }
            }
        }
    }
    return null;
}

// Recursive function to handle adding a course, replacing conflicts if necessary
async function handleCourseAddition(course, isUndo = false) {
    const conflict = findConflict(course);

    if (!conflict) {
        addCourseToGrid(course);
        // Only hide modal if not from Undo action
        if (!isUndo) {
            closeModal('modal');
        }
        updateSuggestedCourses();
        return;
    }

    // Prompt user
    let title, msg;
    const prefix = isUndo ? "Restoring " : "Adding ";
    const subject = formatCourseCode(course.subject, course.courseCode);

    if (conflict.type === 'same') {
        title = 'Duplicate Course';
        msg = `${prefix}${subject} duplicates ${conflict.code}. Replace it?`;
    } else {
        title = 'Time Conflict';
        msg = `${prefix}${subject} conflicts with ${conflict.code}. Replace it?`;
    }

    const confirm = await showConfirmModal(title, msg);
    if (!confirm) return;

    // Remove conflicting course
    removeCourse(conflict.code);

    // Recursively try adding again
    await handleCourseAddition(course, isUndo);
}

// ==========================================
// UI GENERATION
// ==========================================

function createCourseBox(course, schedule) {
    const box = document.createElement('div');
    box.className = 'course-box';
    const codeStr = formatCourseCode(course.subject, course.courseCode);

    box.dataset.courseCode = codeStr;
    box.dataset.startMin = schedule.startMin;
    box.dataset.endMin = schedule.endMin;
    box.dataset.days = schedule.days;
    box.courseData = course;

    const gridStartMin = currentTimeRange.startHour * 60;
    const totalGridMinutes = (currentTimeRange.endHour - currentTimeRange.startHour) * 60;
    const topPercent = ((schedule.startMin - gridStartMin) / totalGridMinutes) * 100;
    const heightPercent = ((schedule.endMin - schedule.startMin) / totalGridMinutes) * 100;

    box.style.top = `${topPercent}%`;
    box.style.height = `${heightPercent}%`;

    box.innerHTML = `
        <div class="course-box-header">
            <span class="course-code">${codeStr}</span>
            <span class="course-section-badge">${course.section}</span>
        </div>
        <div class="course-detail-inline">
            <img src="icons/time.png" class="detail-icon"> ${schedule.time}
        </div>
        <div class="course-detail-inline loc">
            <img src="icons/location.png" class="detail-icon"> ${schedule.room || 'TBA'}
        </div>
    `;
    box.onclick = () => showCourseDetails(course);
    return box;
}

const RAMADAN_START_TIMES = {
    // Morning times (left side of chart)
    '08:00': '10:00',
    '08:30': '10:20',
    '09:00': '10:40',
    '09:30': '11:00',
    '10:00': '11:20',
    '10:30': '11:40',
    '11:00': '12:00',
    '11:30': '12:50',
    '12:00': '13:10',
    '12:30': '13:30',
    '13:00': '13:50',
    '13:30': '14:10',
    '14:00': '14:30',
    '14:30': '14:50',
    '15:00': '15:10',
    '15:30': '16:10',
    '16:00': '16:30',
    '16:30': '21:40',
    '17:00': '22:00',
    '17:30': '22:20',
    '18:00': '22:40',
    '18:30': '23:00',
    '19:00': '23:20',
    '19:30': '23:40',
    '20:00': '00:00',
    '20:30': '00:20',
    '21:00': '00:40',
    '21:30': '01:00',
    '22:00': '01:20',
    '22:30': '01:40',
    '23:00': '02:00',
    '23:30': '02:20'
};

function getRamadanTime(timeStr) {
    if (!timeStr || !timeStr.includes('-')) return null;
    const [start, end] = timeStr.split(' - ');

    // Convert 12h to 24h for lookup
    // E.g., "8:00 AM" -> "08:00", "1:30 PM" -> "13:30"
    const to24h = (t) => {
        const match = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
        if (!match) return null;
        let h = parseInt(match[1]);
        const m = match[2];
        const period = (match[3] || 'AM').toUpperCase();
        if (period === 'PM' && h < 12) h += 12;
        if (period === 'AM' && h === 12) h = 0;
        return `${h.toString().padStart(2, '0')}:${m}`;
    };

    const startKey = to24h(start);
    if (!startKey) return null;

    const mappedStart = RAMADAN_START_TIMES[startKey];
    if (!mappedStart) return null;

    // Calculate duration
    const startMin = parseTime(start);
    const endMin = parseTime(end);
    const duration = endMin - startMin;
    const ramadanDuration = Math.round(duration * 0.7);

    // Calculate new end time
    const newStartMin = parseTime(mappedStart + (parseTime(mappedStart) < 720 && !mappedStart.includes('PM') ? ' AM' : ' PM')); // Hacky 12h guess
    // Better: parseTime handles "10:00" as AM if no suffix? No, parseTime expects suffix.

    // Simple 24h helper for Ramadan math since keys are simplistic
    // Let's assume keys are 24h-ish or just HH:MM
    // Actually, create a robust adder

    const [h, m] = mappedStart.split(':').map(Number);
    let startMins = h * 60 + m;
    let endMins = startMins + ramadanDuration;

    const formatMins = (mins) => {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        const ampm = h >= 12 && h < 24 ? 'PM' : 'AM';
        if (h > 12) h -= 12;
        if (h === 0) h = 12;
        if (h > 12) h -= 24; // Handle >24 wrapping if needed
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    return `${formatMins(startMins)} - ${formatMins(endMins)}`;
}

function showCourseDetails(course) {
    const modal = document.getElementById('detailsModal');
    const content = document.getElementById('detailsContent');
    const removeBtn = document.getElementById('detailsRemoveBtn');

    const codeStr = formatCourseCode(course.subject, course.courseCode);
    const isUniCourse = !!course.crn && !course.isCustom;

    const schedulesHtml = course.schedules.map((s, index) => {
        const ramadanTime = isUniCourse && appSettings.showRamadan ? getRamadanTime(s.time) : null;

        return `
        ${index > 0 ? '<hr style="border:0; border-top:1px dashed var(--border-color); margin:10px 0;">' : ''}
        <div class="details-row"><span class="details-label"><img src="icons/days.png" class="section-icon"> Days:</span><span class="details-value">${formatDays(s.days)}</span></div>
        <div class="details-row"><span class="details-label"><img src="icons/time.png" class="section-icon"> Time:</span><span class="details-value">
            ${s.time}
            ${ramadanTime ? `<div class="ramadan-time" style="margin-top:4px; color:var(--accent-primary); font-size:13px; display:flex; align-items:center;">
                <img src="icons/moon.png" style="width:14px; height:14px; margin-right:6px;"> ${ramadanTime}
            </div>` : ''}
        </span></div>
        <div class="details-row"><span class="details-label"><img src="icons/location.png" class="section-icon"> Location:</span><span class="details-value">${s.room || 'TBA'}</span></div>
        <div class="details-row"><span class="details-label"><img src="icons/instructor.png" class="section-icon"> Instructor:</span><span class="details-value">${s.instructor || 'TBA'}</span></div>
    `}).join('');

    content.innerHTML = `
        <div class="details-row"><span class="details-label">Course:</span><span class="details-value">${codeStr} - ${course.title || ''}</span></div>
        <div class="details-row"><span class="details-label">Section:</span><span class="details-value">${course.section}</span></div>
        <div class="details-row"><span class="details-label">CRN:</span><span class="details-value">${course.crn}</span></div>
        <div class="details-row"><span class="details-label">Credits:</span><span class="details-value">${course.credits} H</span></div>
        <hr style="border:0; border-top:1px solid var(--border-color); margin:15px 0;">
        ${schedulesHtml}
    `;

    removeBtn.onclick = () => {
        removeCourse(codeStr);
        closeModal('detailsModal');
    };

    document.getElementById('closeDetailsBtn').onclick = () => closeModal('detailsModal');

    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
}

function displayCourses(courses) {
    const container = document.getElementById('timetableContainer');
    if (!container) return;

    // Common view switching logic (moved before early return)
    const toggleBtn = document.getElementById('mobileViewToggle');
    document.getElementById('scheduleControls').classList.remove('hidden');
    document.getElementById('schedule').style.display = 'block'; // Show schedule container
    document.querySelector('section').style.display = 'block';   // Show add-courses section
    document.querySelector('main').style.display = 'none';       // Hide main form

    if (courses.length === 0 && (typeof addedTasks === 'undefined' || addedTasks.length === 0)) {
        container.innerHTML = `<div class="empty-state" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding: 40px; text-align: center; color: var(--text-secondary); height: 300px; border: 2px dashed var(--border-color); border-radius: 12px; margin-top:20px;">
                <img src="icons/time.png" style="width: 48px; opacity: 0.3; margin-bottom: 15px; filter: grayscale(1);">
                <p style="font-size: 1.1em; font-weight: 500;">No courses added yet</p>
                <p style="font-size: 0.9em; margin-top:5px;">Use the search bar or "Add Task" to get started.</p>
            </div>`;
        generateMobileScheduleList([], container);
        updateTotalCredits();

        // Ensure mobile view toggle logic runs for empty state too (default to list)
        const savedView = localStorage.getItem('fcitindex-mobile-view') || 'list';
        if (savedView === 'grid') {
            container.classList.add('mobile-grid-active');
            container.classList.remove('mobile-list-active');
            if (toggleBtn) toggleBtn.innerHTML = '<img src="icons/grid.png" alt=""> Switch to List View';
        } else {
            container.classList.add('mobile-list-active');
            container.classList.remove('mobile-grid-active');
            if (toggleBtn) toggleBtn.innerHTML = '<img src="icons/list.png" alt=""> Switch to Grid View';
        }
        return;
    }

    currentTimeRange = calculateTimeRange(courses);
    const { startHour, endHour } = currentTimeRange;
    const gridHeight = (endHour - startHour) * PIXELS_PER_HOUR;

    container.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'timetable-grid';
    grid.style.setProperty('--grid-height', `${gridHeight}px`);

    const headerRow = document.createElement('div');
    headerRow.className = 'grid-header';
    headerRow.innerHTML = '<div class="header-cell time-header"><img src="icons/time.png" class="header-icon" alt="Time"></div>';
    DAYS.forEach(day => {
        const short = day.substring(0, 2);
        headerRow.innerHTML += `<div class="header-cell day-header" data-fullday="${day}" data-shortday="${short}">${day}</div>`;
    });
    grid.appendChild(headerRow);

    const gridBody = document.createElement('div');
    gridBody.className = 'grid-body';

    const timeColumn = document.createElement('div');
    timeColumn.className = 'time-column';
    const totalMin = (endHour - startHour) * 60;

    for (let h = startHour; h <= endHour; h++) {
        const h12 = h % 12 || 12;
        const ampm = h < 12 ? 'AM' : 'PM';
        const label = document.createElement('div');
        label.className = 'time-label';
        const top = ((h - startHour) * 60 / totalMin) * 100;
        label.style.top = `${top}%`;
        label.textContent = `${h12} ${ampm}`;
        timeColumn.appendChild(label);
    }
    gridBody.appendChild(timeColumn);

    DAYS.forEach(day => {
        const dayColumn = document.createElement('div');
        dayColumn.dataset.day = day;
        dayColumn.className = 'day-column'; // Fix missing class

        for (let h = startHour; h <= endHour; h++) {
            const line = document.createElement('div');
            line.className = 'hour-line';
            line.style.top = `${((h - startHour) * 60 / totalMin) * 100}%`;
            dayColumn.appendChild(line);
        }

        courses.forEach(course => {
            course.schedules.forEach(schedule => {
                const parsed = parseScheduleTime(schedule);
                if (!parsed) return;
                const dayCodes = parsed.days.split('');
                const dayNames = dayCodes.map(d => DAY_MAP[d]);
                if (dayNames.includes(day)) {
                    dayColumn.appendChild(createCourseBox(course, parsed));
                }
            });
        });

        // Render tasks for this day
        addedTasks.forEach(task => {
            const dayCode = Object.keys(DAY_MAP).find(key => DAY_MAP[key] === day);
            if (task.days.includes(dayCode)) {
                const [startH, startM] = task.startTime.split(':').map(Number);
                const [endH, endM] = task.endTime.split(':').map(Number);
                const startMin = startH * 60 + startM;
                const endMin = endH * 60 + endM;

                const taskBox = document.createElement('div');
                taskBox.className = 'course-box task-box';
                const startOffset = startMin - startHour * 60;
                const duration = endMin - startMin;
                taskBox.style.top = `${(startOffset / totalMin) * 100}%`;
                taskBox.style.height = `${(duration / totalMin) * 100}%`;

                taskBox.innerHTML = `
                    <div class="course-box-header">
                        <span class="course-code">${task.title}</span>
                    </div>
                    <div class="course-detail-inline loc">
                        <img src="icons/location.png" class="detail-icon" alt="">
                        ${task.subtitle || '-'}
                    </div>
                `;

                taskBox.onclick = () => showTaskDetails(task);
                dayColumn.appendChild(taskBox);
            }
        });

        gridBody.appendChild(dayColumn);
    });

    grid.appendChild(gridBody);
    container.appendChild(grid);

    generateMobileScheduleList(courses, container);
    // generateMobileGridView(courses, container);

    // Restore saved mobile view preference
    const savedView = localStorage.getItem('fcitindex-mobile-view') || 'list';
    if (savedView === 'grid') {
        container.classList.add('mobile-grid-active');
        container.classList.remove('mobile-list-active');
        if (toggleBtn) toggleBtn.innerHTML = '<img src="icons/grid.png" alt=""> Switch to List View';
    } else {
        container.classList.add('mobile-list-active');
        container.classList.remove('mobile-grid-active');
        if (toggleBtn) toggleBtn.innerHTML = '<img src="icons/list.png" alt=""> Switch to Grid View';
    }

    // Save schedule state whenever courses are displayed
    saveScheduleState();
    updateTotalCredits(); // Update credits after displaying courses
}


function generateMobileScheduleList(courses, container) {
    let list = container.querySelector('.mobile-schedule-list');
    if (list) list.remove();

    list = document.createElement('div');
    list.className = 'mobile-schedule-list';

    const daysWithCourses = {};
    DAYS.forEach(day => daysWithCourses[day] = []);

    courses.forEach(c => {
        c.schedules.forEach(s => {
            const p = parseScheduleTime(s);
            if (p) p.days.split('').forEach(d => {
                const name = DAY_MAP[d];
                if (daysWithCourses[name]) daysWithCourses[name].push({ course: c, schedule: s, start: p.startMin, isTask: false });
            });
        });
    });

    // Add tasks to the list
    if (typeof addedTasks !== 'undefined') {
        addedTasks.forEach(t => {
            t.days.split('').forEach(d => {
                const name = DAY_MAP[d];
                if (daysWithCourses[name]) {
                    const [h, m] = t.startTime.split(':').map(Number);
                    const startMin = h * 60 + m;
                    daysWithCourses[name].push({ task: t, start: startMin, isTask: true });
                }
            });
        });
    }

    DAYS.forEach(day => {
        const dayCourses = daysWithCourses[day];
        if (dayCourses.length === 0) return;

        const group = document.createElement('div');
        group.className = 'mobile-day-group';
        group.innerHTML = `<div class="mobile-day-header">${day}</div>`;

        dayCourses.sort((a, b) => a.start - b.start);

        dayCourses.forEach(item => {
            if (item.isTask) {
                const { task } = item;
                const card = document.createElement('div');
                card.className = 'mobile-course-card task-card';
                card.style.borderLeftColor = '#7c4dff'; // Task color

                card.innerHTML = `
                    <div class="card-header-row">
                        <div class="mobile-course-code" style="color: #b388ff">${task.title}</div>
                        <div class="card-badges">
                            <span class="section-badge" style="background: #7c4dff">TASK</span>
                            <button class="remove-mobile-btn" title="Remove"><img src="icons/x.png" alt=""></button>
                        </div>
                    </div>
                    <div class="mobile-course-title">${task.subtitle || ''}</div>
                    <div class="course-meta">
                        <div class="meta-row"><img src="icons/time.png" class="meta-icon"> ${task.startTime} - ${task.endTime}</div>
                        ${task.description ? `<div class="meta-row" style="font-style: italic; color: var(--text-muted); margin-top: 4px;">${task.description}</div>` : ''}
                    </div>
                `;

                const removeBtn = card.querySelector('.remove-mobile-btn');
                removeBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (confirm('Remove task?')) removeTask(task.id);
                };

                card.onclick = () => showTaskDetails(task);
                group.appendChild(card);
            } else {
                const { course, schedule } = item;
                const codeStr = formatCourseCode(course.subject, course.courseCode);
                const card = document.createElement('div');
                card.className = 'mobile-course-card';
                card.dataset.courseCode = codeStr;

                const ramadanTime = !course.isCustom ? getRamadanTime(schedule.time) : null;
                const ramadanHtml = ramadanTime ? `<span class="ramadan-time-inline"><img src="icons/moon.png" class="meta-icon"> ${ramadanTime}</span>` : '';

                card.innerHTML = `
                    <div class="card-header-row">
                        <div class="mobile-course-code">${codeStr}</div>
                        <div class="card-badges">
                            <span class="section-badge">${course.section}</span>
                            <span class="crn-badge">${course.crn}</span>
                            <span class="credits-badge">${course.credits} H</span>
                            <button class="remove-mobile-btn" title="Remove"><img src="icons/x.png" alt=""></button>
                        </div>
                    </div>
                    <div class="mobile-course-title">${course.title || ''}</div>
                    <div class="course-meta">
                        <div class="meta-row"><img src="icons/time.png" class="meta-icon"> ${schedule.time} ${ramadanHtml}</div>
                        <div class="meta-row"><img src="icons/location.png" class="meta-icon"> ${schedule.room || 'TBA'}</div>
                        <div class="meta-row"><img src="icons/instructor.png" class="meta-icon"> ${schedule.instructor || 'TBA'}</div>
                    </div>
                `;

                const removeBtn = card.querySelector('.remove-mobile-btn');
                removeBtn.onclick = (e) => {
                    e.stopPropagation();
                    removeCourse(codeStr);
                };

                card.onclick = () => showCourseDetails(course);
                group.appendChild(card);
            }
        });

        list.appendChild(group);
    });

    container.appendChild(list);

    // Apply settings immediately after rendering list
    if (typeof applySettings === 'function') applySettings();
}

// Generate compact mobile grid view (alternative to list view)
function generateMobileGridView(courses, container) {
    let grid = container.querySelector('.mobile-schedule-grid');
    if (grid) grid.remove();

    grid = document.createElement('div');
    grid.className = 'mobile-schedule-grid';

    // Calculate time range
    const { startHour, endHour } = currentTimeRange;
    const totalMinutes = (endHour - startHour) * 60;
    const gridHeight = Math.max(300, (endHour - startHour) * 50); // 50px per hour

    // Create header row
    const header = document.createElement('div');
    header.className = 'mobile-grid-header';
    const timeHeader = document.createElement('div');
    timeHeader.className = 'mobile-grid-header-cell';
    timeHeader.style.display = 'flex';
    timeHeader.style.alignItems = 'center';
    timeHeader.style.justifyContent = 'center';
    timeHeader.innerHTML = '<img src="icons/time.png" style="width:16px; height:16px; opacity:0.7;">';
    header.appendChild(timeHeader);
    DAYS.forEach(day => {
        const abbrev = day.substring(0, 2);
        header.innerHTML += `<div class="header-cell">${abbrev}</div>`;
    });
    grid.appendChild(header);

    // Create grid body
    const body = document.createElement('div');
    body.className = 'mobile-grid-body';
    body.style.height = `${gridHeight}px`;

    // Time column
    const timeCol = document.createElement('div');
    timeCol.className = 'mobile-time-column';
    for (let h = startHour; h <= endHour; h++) {
        const label = document.createElement('div');
        label.className = 'mobile-time-label';
        const top = ((h - startHour) * 60 / totalMinutes) * 100;
        label.style.top = `${top}%`;
        label.textContent = h > 12 ? (h - 12) : h;
        timeCol.appendChild(label);
    }
    body.appendChild(timeCol);

    // Day columns with courses
    DAYS.forEach(day => {
        const dayCol = document.createElement('div');
        dayCol.className = 'mobile-day-column';

        // Hour lines
        for (let h = startHour; h <= endHour; h++) {
            const line = document.createElement('div');
            line.className = 'mobile-hour-line';
            line.style.top = `${((h - startHour) * 60 / totalMinutes) * 100}%`;
            dayCol.appendChild(line);
        }

        // Add courses for this day
        courses.forEach(course => {
            course.schedules.forEach(schedule => {
                const parsed = parseScheduleTime(schedule);
                if (!parsed) return;

                const dayCodes = parsed.days.split('');
                const dayNames = dayCodes.map(d => DAY_MAP[d]);

                if (dayNames.includes(day)) {
                    const block = document.createElement('div');
                    block.className = 'mobile-course-block';

                    // Calculate position
                    const startOffset = parsed.startMin - (startHour * 60);
                    const duration = parsed.endMin - parsed.startMin;
                    const topPercent = (startOffset / totalMinutes) * 100;
                    const heightPercent = (duration / totalMinutes) * 100;

                    block.style.top = `${topPercent}%`;
                    block.style.height = `${heightPercent}%`;

                    const codeStr = formatCourseCode(course.subject, course.courseCode);
                    const location = schedule.room || 'TBA';

                    block.innerHTML = `
                        <div class="mobile-course-code">${codeStr}</div>
                        <div class="mobile-course-location">${location}</div>
                    `;

                    // Click to show details
                    block.onclick = () => showCourseDetails(course, schedule);

                    dayCol.appendChild(block);
                }
            });
        });

        body.appendChild(dayCol);
    });

    grid.appendChild(body);

    // Empty state
    if (courses.length === 0) {
        grid.innerHTML = '<div class="empty-schedule-msg" style="padding: 40px; text-align: center;">No courses added to your schedule yet</div>';
    }

    container.appendChild(grid);
}

// ==========================================
// COURSE FETCHING & FILTERING
// ==========================================

function populateTimeFilter() {
    const select = document.getElementById('filterStartTime');
    if (!select) return;

    for (let min = 8 * 60; min <= 22 * 60; min += 30) {
        const h = Math.floor(min / 60);
        const m = min % 60;
        const h12 = h > 12 ? h - 12 : (h === 0 ? 12 : h);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const val = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        const label = `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = label;
        select.appendChild(opt);
    }
}

// Sequential modal flow for female students
async function showSequentialModals(courses) {
    for (const code of courses) {
        await showSectionChoicesAsync(code);
    }
}

// Promise-based version of showSectionChoices
function showSectionChoicesAsync(code) {
    return new Promise((resolve) => {
        // Track when modal closes
        const modal = document.getElementById('modal');

        // Show the section choices
        showSectionChoices(code);

        // Create a mutation observer to detect when modal is hidden
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'style') {
                    if (modal.style.display === 'none' || modal.style.display === '') {
                        observer.disconnect();
                        resolve();
                    }
                }
            });
        });

        observer.observe(modal, { attributes: true, attributeFilter: ['style'] });

        // Also listen for click on close button and add-section buttons
        const closeHandler = () => {
            observer.disconnect();
            closeModal('modal');
            resolve();
        };

        const closeBtn = modal.querySelector('.modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeHandler, { once: true });
        }
    });
}

async function showSectionChoices(code) {
    const gender = document.getElementById('gender').value;
    const modal = document.getElementById('modal');
    const titleSpan = document.getElementById('modalTitle')?.querySelector('span');
    const list = document.getElementById('sectionList');

    if (!modal || !list) return;

    titleSpan.textContent = code;
    list.innerHTML = '<p class="loading-msg">Loading sections...</p>';

    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    document.getElementById('filterInstructor').value = '';
    document.getElementById('filterSection').value = '';
    document.getElementById('filterCrn').value = '';
    document.getElementById('filterStartTime').value = '';
    document.getElementById('filterConflict').checked = false;
    document.querySelectorAll('input[name="filterDay"]').forEach(cb => cb.checked = false);

    try {
        const cleanCode = code.replace('-', '');
        const apiUrl = new URL('https://api.kauindex.com/search');
        apiUrl.searchParams.append('termCode', '202602');
        apiUrl.searchParams.append('q', cleanCode);
        apiUrl.searchParams.append('gender', gender);
        apiUrl.searchParams.append('limit', '50');

        const response = await fetchWithTimeout(apiUrl.toString());

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const result = await response.json();
        list.innerHTML = '';

        if (!result.data || result.data.length === 0) {
            list.innerHTML = '<p class="no-results-msg">No sections found for this course.</p>';
            return;
        }

        result.data.forEach(course => {
            const card = document.createElement('div');
            card.className = 'section-card';

            const thisCourseCode = formatCourseCode(course.subject, course.courseCode);
            const conflict = findConflict(course);

            if (conflict) card.classList.add('has-conflict');

            card.dataset.instructor = (course.schedules[0]?.instructor || course.primaryInstructor || '').toLowerCase();
            card.dataset.section = (course.section || '').toUpperCase();
            card.dataset.crn = course.crn || '';

            const firstTime = course.schedules[0]?.time?.split(' - ')[0] || '';
            const m = firstTime.match(/(\d+):(\d+) ([AP]M)/);
            if (m) {
                let h = parseInt(m[1]);
                if (m[3] === 'PM' && h !== 12) h += 12;
                if (m[3] === 'AM' && h === 12) h = 0;
                card.dataset.startTime = `${h.toString().padStart(2, '0')}:${m[2]}`;
            }

            card.dataset.days = course.schedules.map(s => s.days).join('');

            card.innerHTML = `
                <div class="section-header">
                    <span class="section-course-name">${thisCourseCode}</span>
                    <div class="section-info-right">
                        ${conflict?.type === 'same' ? '<span class="conflict-warning">Same Course</span>' : ''}
                        ${conflict?.type === 'time' ? '<span class="conflict-warning">Time Conflict</span>' : ''}
                        <span class="section-number">${course.section}</span>
                        <span class="section-crn">${course.crn}</span>
                        <span class="credits-badge">${course.credits} H</span>
                    </div>
                </div>
                <div class="section-details">
                    ${course.schedules.map(s => `
                        <div class="schedule-row">
                            <div class="detail-row"><span class="detail-label"><img src="icons/days.png" class="section-icon"> Days:</span><span class="detail-value">${formatDays(s.days)}</span></div>
                            <div class="detail-row"><span class="detail-label"><img src="icons/time.png" class="section-icon"> Time:</span><span class="detail-value">${s.time}</span></div>
                            <div class="detail-row"><span class="detail-label"><img src="icons/location.png" class="section-icon"> Location:</span><span class="detail-value">${s.room || 'TBA'}</span></div>
                            <div class="detail-row"><span class="detail-label"><img src="icons/instructor.png" class="section-icon"> Instructor:</span><span class="detail-value">${s.instructor || course.primaryInstructor || 'TBA'}</span></div>
                        </div>
                    `).join('')}
                </div>
            `;

            const btn = document.createElement('button');
            btn.className = 'add-section-btn';
            btn.textContent = conflict ? 'REPLACE EXISTING' : 'ADD THIS SECTION';
            btn.onclick = () => handleCourseAddition(course);

            card.appendChild(btn);
            list.appendChild(card);
        });

        applyFilters();

    } catch (e) {
        console.error('Section fetch error:', e);
        const errorMessage = e.isNetworkError
            ? e.message
            : 'Could not load sections. Please check your connection.';
        list.innerHTML = `<p class="error-msg">${errorMessage}</p>`;
    }
}

function applyFilters() {
    const instr = document.getElementById('filterInstructor').value.toLowerCase();
    const sec = document.getElementById('filterSection').value.toUpperCase();
    const crn = document.getElementById('filterCrn').value;
    const start = document.getElementById('filterStartTime').value;
    const hideConf = document.getElementById('filterConflict').checked;

    const selectedDays = Array.from(document.querySelectorAll('input[name="filterDay"]:checked')).map(c => c.value);

    document.querySelectorAll('.section-card').forEach(card => {
        let show = true;
        if (instr && !card.dataset.instructor.includes(instr)) show = false;
        if (sec && !card.dataset.section.includes(sec)) show = false;
        if (crn && !card.dataset.crn.includes(crn)) show = false;
        if (start && card.dataset.startTime !== start) show = false;
        if (hideConf && card.classList.contains('has-conflict')) show = false;

        // Day Match Logic (Any/Intersection)
        if (selectedDays.length > 0) {
            const courseDays = [...new Set(card.dataset.days.split(''))];
            // Check: At least one selected day is in the course days
            const hasAnyDay = selectedDays.some(d => courseDays.includes(d));
            if (!hasAnyDay) show = false;
        }

        card.style.display = show ? 'block' : 'none';
    });

    // Show message if all sections are filtered out
    const list = document.getElementById('sectionList');
    const actuallyVisible = [...list.querySelectorAll('.section-card')].filter(c => c.style.display !== 'none');

    // Remove existing filter message if any
    const existingMsg = list.querySelector('.no-results-msg.filter-msg');
    if (existingMsg) existingMsg.remove();

    if (actuallyVisible.length === 0 && list.querySelectorAll('.section-card').length > 0) {
        const msg = document.createElement('p');
        msg.className = 'no-results-msg filter-msg';
        msg.textContent = 'No sections match your filters.';
        list.appendChild(msg);
    }
}

// ==========================================
// HELPERS
// ==========================================

function getCoursesOnGrid() {
    const codes = new Set();
    document.querySelectorAll('.course-box').forEach(box => {
        codes.add(box.dataset.courseCode);
    });
    return [...codes];
}

function getAllCoursesFromGrid() {
    const courses = [];
    const seen = new Set();
    document.querySelectorAll('.course-box').forEach(box => {
        if (box.courseData && !seen.has(box.courseData.crn)) {
            courses.push(box.courseData);
            seen.add(box.courseData.crn);
        }
    });
    return courses;
}

function updateSuggestedCourses() {
    if (!currentMajor || !currentTerm) return;
    const onGrid = getCoursesOnGrid();
    const gender = document.getElementById('gender').value;

    // Use female-specific lists for female users
    const subjects = gender === 'female' ? termSubjectsFemale : termSubjects;
    const suggested = gender === 'female' ? alwaysSuggestedFemale : alwaysSuggested;

    const req = subjects[currentMajor]?.[currentTerm] || [];
    const sugg = suggested[currentMajor]?.[currentTerm] || [];
    const all = [...new Set([...req, ...sugg])];

    const missing = all.filter(code => !onGrid.includes(code));

    const div = document.getElementById('suggestedButtons');
    div.innerHTML = '';

    if (missing.length === 0) {
        div.innerHTML = '<em class="all-found-msg">All suggested courses added!</em>';
        return;
    }

    missing.forEach(code => {
        const btn = document.createElement('button');
        btn.textContent = code;
        btn.onclick = () => showSectionChoices(code);
        div.appendChild(btn);
    });
}

function addCourseToGrid(course) {
    const current = getAllCoursesFromGrid();
    current.push(course);
    displayCourses(current);
    saveScheduleState();
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    populateTimeFilter();
    restoreFormState();

    // Initialize tasks and settings
    loadTasks();
    loadSettings();
    initTaskListeners();
    initSettingsListeners();

    // Restore schedule after form state is fully restored
    setTimeout(() => {
        restoreScheduleState();
    }, 300);

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    const savedTheme = localStorage.getItem('theme');

    // Set initial theme and icon
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.src = 'icons/sun.png';
    }

    themeToggle?.addEventListener('click', () => {
        const isLight = document.body.getAttribute('data-theme') === 'light';
        if (isLight) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            if (themeIcon) themeIcon.src = 'icons/moon.png';
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            if (themeIcon) themeIcon.src = 'icons/sun.png';
        }
    });

    ['filterInstructor', 'filterSection', 'filterCrn', 'filterStartTime', 'filterConflict'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', applyFilters);
            el.addEventListener('change', applyFilters);
        }
    });
    document.querySelectorAll('input[name="filterDay"]').forEach(cb => cb.addEventListener('change', applyFilters));

    // Mobile filter toggle
    document.getElementById('mobileFilterToggle')?.addEventListener('click', () => {
        const panel = document.getElementById('filtersPanel');
        panel?.classList.toggle('expanded');
    });

    document.getElementById('major')?.addEventListener('change', function () {
        currentMajor = this.value;
        const blockSelect = document.getElementById('block');
        const gender = document.getElementById('gender').value;

        // Don't repopulate block if female - keep "Coming Soon"
        if (gender === 'female') {
            saveFormState();
            return;
        }

        blockSelect.innerHTML = '<option value="">Select Block</option>';
        (blocksByMajor[this.value] || []).forEach(b => {
            blockSelect.innerHTML += `<option value="${b}">${b}</option>`;
        });
        saveFormState();
    });

    document.getElementById('year')?.addEventListener('change', function () {
        const y = parseInt(this.value);
        const termSelect = document.getElementById('term');
        termSelect.innerHTML = '<option value="">Select Term</option>';
        if (y === 2) {
            termSelect.innerHTML += '<option value="4">Term 2 (First in Major)</option>';
        } else if (y >= 3) {
            const base = (y - 3) * 2 + 5;
            termSelect.innerHTML += `<option value="${base}">Term 1</option>`;
            termSelect.innerHTML += `<option value="${base + 1}">Term 2</option>`;
        }
        saveFormState();
    });

    document.getElementById('term')?.addEventListener('change', function () {
        currentTerm = this.value;
        saveFormState();
    });

    document.getElementById('gender')?.addEventListener('change', function () {
        const gender = this.value;
        const blockSelect = document.getElementById('block');

        if (gender === 'female') {
            blockSelect.innerHTML = '<option value="female-mode" selected>Coming Soon</option>';
            blockSelect.disabled = true;
        } else {
            blockSelect.disabled = false;
            blockSelect.innerHTML = '<option value="">Select Block</option>';
            // Repopulate block options if major is selected
            if (currentMajor && blocksByMajor[currentMajor]) {
                blocksByMajor[currentMajor].forEach(b => {
                    blockSelect.innerHTML += `<option value="${b}">${b}</option>`;
                });
            }
        }
        saveFormState();
    });

    document.getElementById('block')?.addEventListener('change', saveFormState);

    document.getElementById('blockForm')?.addEventListener('submit', async function (e) {
        e.preventDefault();
        const gender = document.getElementById('gender').value;
        const block = document.getElementById('block').value;

        // Female mode doesn't need block validation - uses "female-mode" value
        if (gender === 'female') {
            if (!currentMajor || !currentTerm) return;
        } else {
            if (!gender || !currentMajor || !currentTerm || !block) return;
        }

        const btn = this.querySelector('button');
        btn.textContent = 'Loading...';
        btn.disabled = true;

        try {
            if (gender === 'female') {
                // Female flow: Empty schedule + sequential modals for mandatory courses
                displayCourses([]);

                const mandatory = termSubjectsFemale[currentMajor]?.[currentTerm] || [];
                if (mandatory.length > 0) {
                    await showSequentialModals(mandatory);
                }

                updateSuggestedCourses();
            } else {
                // Male flow: Fetch block schedule from API
                const url = `https://api.kauindex.com/search?termCode=202602&section=${block}&gender=${gender}&level=بكالوريوس&limit=100`;
                const res = await fetchWithTimeout(url);

                if (!res.ok) {
                    throw new Error(`Server returned ${res.status}`);
                }

                const json = await res.json();

                if (json.status === 'success' && json.data.length) {
                    const req = termSubjects[currentMajor][currentTerm];
                    const filtered = json.data.filter(c => req.includes(formatCourseCode(c.subject, c.courseCode)));
                    displayCourses(filtered);
                    updateSuggestedCourses();
                } else {
                    // No courses found - show empty schedule with suggestions
                    displayCourses([]);
                    updateSuggestedCourses();
                }
            }
        } catch (err) {
            console.error('Load schedule error:', err);
            const errorMessage = err.isNetworkError
                ? err.message
                : 'Could not load schedule. Please check your internet connection and try again.';

            // Use simple alert for errors - modal blocks if not visible
            alert('Connection Error\n\n' + errorMessage);
        } finally {
            btn.textContent = 'Load Block Schedule';
            btn.disabled = false;
        }
    });

    const performSearch = () => {
        const val = document.getElementById('courseInput').value.trim().toUpperCase();
        if (val) {
            const formatted = val.includes('-') ? val : val.replace(/([A-Z]+)(\d+)/, '$1-$2');
            showSectionChoices(formatted);
            document.getElementById('courseInput').value = '';
        }
    };
    document.getElementById('fetchBtn')?.addEventListener('click', performSearch);
    document.getElementById('courseInput')?.addEventListener('keypress', e => { if (e.key === 'Enter') performSearch(); });

    document.getElementById('clearScheduleBtn')?.addEventListener('click', async () => {
        const confirmed = await showConfirmModal('Reset Schedule', 'Clear entire schedule?');

        if (confirmed) {
            document.getElementById('timetableContainer').innerHTML = '';
            document.getElementById('scheduleControls').classList.add('hidden');
            document.getElementById('schedule').style.display = 'none'; // Hide schedule container
            document.querySelector('section').style.display = 'none';
            document.querySelector('main').style.display = 'block';
            // Keep form values - don't reset
            saveScheduleState(); // Clear saved schedule
            addedTasks = []; // Clear tasks
            saveTasks(); // Save empty tasks
            refreshSchedule(); // Refresh to show empty state - wait, if main is blocked, we don't want refresh?
            // Actually refreshSchedule calls displayCourses which shows schedule.
            // If we cleared everything, we want to go back to FORM view.
            // So we should NOT call refreshSchedule, just clear state.
            localStorage.removeItem('scheduleState');
        }
    });

    // Logo click - same as Reset Schedule
    document.getElementById('logoBtn')?.addEventListener('click', async () => {
        const confirmed = await showConfirmModal('Reset Schedule', 'Clear entire schedule?');

        if (confirmed) {
            document.getElementById('timetableContainer').innerHTML = '';
            document.getElementById('scheduleControls').classList.add('hidden');
            document.getElementById('schedule').style.display = 'none'; // Hide schedule container
            document.querySelector('section').style.display = 'none';
            document.querySelector('main').style.display = 'block';

            localStorage.removeItem('scheduleState');
            addedTasks = [];
            saveTasks();
        }
    });

    // Mobile view toggle (list <-> grid)
    document.getElementById('mobileViewToggle')?.addEventListener('click', () => {
        const container = document.getElementById('timetableContainer');
        const toggleBtn = document.getElementById('mobileViewToggle');
        const isGridActive = container.classList.contains('mobile-grid-active');

        if (isGridActive) {
            // Switch to list view
            container.classList.remove('mobile-grid-active');
            container.classList.add('mobile-list-active');
            toggleBtn.innerHTML = '<img src="icons/grid.png" alt=""> Switch to Grid View';
            localStorage.setItem('fcitindex-mobile-view', 'list');
        } else {
            // Switch to grid view
            container.classList.remove('mobile-list-active');
            container.classList.add('mobile-grid-active');
            toggleBtn.innerHTML = '<img src="icons/list.png" alt=""> Switch to List View';
            localStorage.setItem('fcitindex-mobile-view', 'grid');
        }
    });

    // Custom Course Handlers
    document.getElementById('openCustomModalBtn')?.addEventListener('click', () => {
        document.getElementById('customCourseModal').style.display = 'flex';
        document.body.classList.add('modal-open');
    });

    document.getElementById('closeCustomBtn')?.addEventListener('click', () => {
        closeModal('customCourseModal');
    });

    document.getElementById('addCustomEntryBtn')?.addEventListener('click', () => {
        // Collect Full Fields
        const code = document.getElementById('customCode').value.trim().toUpperCase();
        const title = document.getElementById('customTitle').value.trim();
        const section = document.getElementById('customSection').value.trim().toUpperCase();
        const crn = document.getElementById('customCrn').value.trim();
        const credits = document.getElementById('customCredits').value.trim();
        const instructor = document.getElementById('customInstructor').value.trim();
        const days = Array.from(document.querySelectorAll('input[name="customDay"]:checked')).map(c => c.value).join('');
        const start = document.getElementById('customStartTime').value;
        const end = document.getElementById('customEndTime').value;
        const loc = document.getElementById('customLocation').value.trim();
        const err = document.getElementById('customErrorMsg');

        // Validation based on "all fields required"
        if (!code || !title || !section || !crn || !credits || !instructor || !days || !start || !end || !loc) {
            err.textContent = 'Please fill in ALL fields.';
            err.style.display = 'block';
            return;
        }

        if (start >= end) {
            err.textContent = 'Start time must be before end time.';
            err.style.display = 'block';
            return;
        }

        // Check duplicates (CRN)
        const existing = getAllCoursesFromGrid();
        if (existing.some(c => c.crn === crn)) {
            err.textContent = 'A course with this CRN already exists on your schedule.';
            err.style.display = 'block';
            return;
        }

        err.style.display = 'none';

        // Format times
        const formatTime = (t) => {
            const [h, m] = t.split(':').map(Number);
            const ampm = h >= 12 ? 'PM' : 'AM';
            const h12 = h % 12 || 12;
            return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
        };

        const timeStr = `${formatTime(start)} - ${formatTime(end)}`;

        // Separate Subject and Number from Code (e.g. CS-101 -> Subject: CS, Code: 101)
        let subject = '';
        let courseNum = code;
        if (code.includes('-')) {
            const parts = code.split('-');
            subject = parts[0];
            courseNum = parts.slice(1).join('-'); // Handle codes like CPCS-203
        }

        const course = {
            title: title,
            subject: subject,
            courseCode: courseNum,
            section: section,
            crn: crn, // User provided
            credits: credits,
            primaryInstructor: instructor,
            isCustom: true,
            schedules: [{
                days: days,
                time: timeStr,
                room: loc,
                instructor: instructor
            }]
        };

        saveCustomCourse(course);
        handleCourseAddition(course);
        closeModal('customCourseModal');

        // Reset inputs
        document.getElementById('customCode').value = '';
        document.getElementById('customTitle').value = '';
        document.getElementById('customSection').value = '';
        document.getElementById('customCrn').value = '';
        document.getElementById('customCredits').value = '';
        document.getElementById('customInstructor').value = '';
        document.querySelectorAll('input[name="customDay"]').forEach(c => c.checked = false);
        document.getElementById('customStartTime').value = '';
        document.getElementById('customEndTime').value = '';
        document.getElementById('customLocation').value = '';
    });

    // ESC key closes modals (added custom)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal('modal');
            closeModal('detailsModal');
            closeModal('confirmModal');
            closeModal('customCourseModal');
            document.getElementById('settingsModal')?.classList.remove('active');
            document.getElementById('taskModal')?.classList.remove('active');
        }
    });

    document.getElementById('customCourseModal')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal('customCourseModal');
    });

    // Click outside modal content closes modal
    document.getElementById('modal')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeModal('modal');
        }
    });
    document.getElementById('detailsModal')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeModal('detailsModal');
        }
    });
    document.getElementById('confirmModal')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            // For confirm modal, treat click-outside as cancel
            document.getElementById('confirmNo')?.click();
        }
    });
});
// ===== TASKS FUNCTIONALITY =====
let addedTasks = [];

function saveTasks() {
    localStorage.setItem('fcitindex-tasks', JSON.stringify(addedTasks));
}

function loadTasks() {
    const saved = localStorage.getItem('fcitindex-tasks');
    if (saved) {
        addedTasks = JSON.parse(saved);
    }
}

function addTask(taskData) {
    const task = {
        id: 'task_' + Date.now(),
        title: taskData.title,
        subtitle: taskData.subtitle,
        days: taskData.days,
        startTime: taskData.startTime,
        endTime: taskData.endTime,
        description: taskData.description || '',
        isTask: true
    };

    addedTasks.push(task);
    saveTasks();
    refreshSchedule();
    showToast('Task added: ' + task.title);
    return task;
}

function removeTask(taskId) {
    addedTasks = addedTasks.filter(t => t.id !== taskId);
    saveTasks();
    refreshSchedule();
    showToast('Task removed');
}

function showTaskDetails(task) {
    const modal = document.getElementById('detailsModal');
    const title = document.getElementById('detailsTitle');
    const content = document.getElementById('detailsContent');
    const removeBtn = document.getElementById('detailsRemoveBtn');

    title.textContent = 'Task Details';

    const dayNames = task.days.split('').map(d => DAY_MAP[d] || d).join(', ');

    content.innerHTML = `
        <div class="details-row">
            <span class="details-label">Title</span>
            <span class="details-value">${task.title}</span>
        </div>
        <div class="details-row">
            <span class="details-label">Subtitle</span>
            <span class="details-value">${task.subtitle || '-'}</span>
        </div>
        <div class="details-row">
            <span class="details-label">Days</span>
            <span class="details-value">${dayNames}</span>
        </div>
        <div class="details-row">
            <span class="details-label">Time</span>
            <span class="details-value">${task.startTime} - ${task.endTime}</span>
        </div>
        ${task.description ? `
        <div class="details-row">
            <span class="details-label">Description</span>
            <span class="details-value">${task.description}</span>
        </div>
        ` : ''}
    `;

    removeBtn.textContent = 'Remove Task';
    removeBtn.onclick = () => {
        removeTask(task.id);
        closeModal('detailsModal'); // Use the common closeModal function
    };

    modal.style.display = 'flex'; // Use display:flex for modals
    document.body.classList.add('modal-open');
}

// ===== SETTINGS FUNCTIONALITY =====
const defaultSettings = {
    showRamadan: false,
    showCrn: true,
    showCredits: true
};

let appSettings = { ...defaultSettings };

function saveSettings() {
    localStorage.setItem('fcitindex-settings', JSON.stringify(appSettings));
    applySettings();
}

function loadSettings() {
    const saved = localStorage.getItem('fcitindex-settings');
    if (saved) {
        appSettings = { ...defaultSettings, ...JSON.parse(saved) };
    }
    applySettings();
    syncSettingsUI();
}

function syncSettingsUI() {
    const ramadanToggle = document.getElementById('settingRamadan');
    const crnToggle = document.getElementById('settingCrn');
    const creditsToggle = document.getElementById('settingCredits');

    if (ramadanToggle) ramadanToggle.checked = appSettings.showRamadan;
    if (crnToggle) crnToggle.checked = appSettings.showCrn;
    if (creditsToggle) creditsToggle.checked = appSettings.showCredits;
}

function applySettings() {
    // Apply Ramadan visibility
    document.querySelectorAll('.ramadan-time, .ramadan-time-inline').forEach(el => {
        el.style.display = appSettings.showRamadan ? '' : 'none';
    });

    // Apply CRN visibility in mobile list
    document.querySelectorAll('.mobile-course-card .crn-badge').forEach(el => {
        el.style.display = appSettings.showCrn ? '' : 'none';
    });

    // Apply Credits visibility in mobile list
    document.querySelectorAll('.mobile-course-card .credits-badge').forEach(el => {
        el.style.display = appSettings.showCredits ? '' : 'none';
    });
}

// Initialize settings event listeners
function initSettingsListeners() {
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');

    if (settingsBtn && settingsModal) {
        settingsBtn.onclick = (e) => {
            e.stopPropagation();
            settingsModal.style.display = 'flex';
            document.body.classList.add('modal-open'); // Lock scroll
        };
    }

    if (closeSettingsBtn && settingsModal) {
        closeSettingsBtn.onclick = () => {
            settingsModal.style.display = 'none';
            document.body.classList.remove('modal-open'); // Unlock scroll
        };
    }

    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                settingsModal.style.display = 'none';
                document.body.classList.remove('modal-open'); // Unlock scroll
            }
        });
    }

    const ramadanToggle = document.getElementById('settingRamadan');
    const crnToggle = document.getElementById('settingCrn');
    const creditsToggle = document.getElementById('settingCredits');

    if (ramadanToggle) {
        ramadanToggle.checked = appSettings.showRamadan;
        ramadanToggle.onchange = () => {
            appSettings.showRamadan = ramadanToggle.checked;
            saveSettings();
            applySettings();
        };
    }

    if (crnToggle) {
        crnToggle.checked = appSettings.showCrn;
        crnToggle.onchange = () => {
            appSettings.showCrn = crnToggle.checked;
            saveSettings();
            applySettings();
        };
    }

    if (creditsToggle) {
        creditsToggle.checked = appSettings.showCredits;
        creditsToggle.onchange = () => {
            appSettings.showCredits = creditsToggle.checked;
            saveSettings();
            applySettings();
        };
    }
}

// Initialize task modal listeners
function initTaskListeners() {
    const openTaskBtn = document.getElementById('openTaskModalBtn');
    const taskModal = document.getElementById('taskModal');
    const closeTaskBtn = document.getElementById('closeTaskModalBtn');
    const addTaskBtn = document.getElementById('addTaskBtn');

    if (openTaskBtn && taskModal) {
        openTaskBtn.onclick = (e) => {
            e.stopPropagation();
            taskModal.style.display = 'flex';
            document.body.classList.add('modal-open'); // Lock scroll
        };
    }

    if (closeTaskBtn && taskModal) {
        closeTaskBtn.onclick = () => {
            taskModal.style.display = 'none';
            document.body.classList.remove('modal-open'); // Unlock scroll
        };
    }

    if (taskModal) {
        taskModal.onclick = (e) => {
            if (e.target === taskModal) {
                taskModal.style.display = 'none';
                document.body.classList.remove('modal-open'); // Unlock scroll
            }
        };
    }

    if (addTaskBtn) {
        addTaskBtn.onclick = () => {
            const title = document.getElementById('taskTitle').value;
            const subtitle = document.getElementById('taskSubtitle').value;
            const startTime = document.getElementById('taskStartTime').value;
            const endTime = document.getElementById('taskEndTime').value;
            const description = document.getElementById('taskDescription').value;

            const selectedDays = [];
            document.querySelectorAll('input[name="taskDay"]:checked').forEach(cb => {
                selectedDays.push(cb.value);
            });

            if (!title || !startTime || !endTime || selectedDays.length === 0) {
                showToast('Please fill in required fields');
                return;
            }

            addTask({
                title,
                subtitle,
                days: selectedDays.join(''),
                startTime,
                endTime,
                description
            });

            // Clear inputs
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskSubtitle').value = '';
            document.getElementById('taskStartTime').value = '';
            document.getElementById('taskEndTime').value = '';
            document.getElementById('taskDescription').value = '';
            document.querySelectorAll('input[name="taskDay"]').forEach(cb => cb.checked = false);

            taskModal.style.display = 'none';
            document.body.classList.remove('modal-open'); // Unlock scroll
        };
    }
}

// ===== CREDITS CALCULATION =====
function updateTotalCredits() {
    const allCourses = getAllCoursesFromGrid();
    let total = 0;

    allCourses.forEach(c => {
        // Custom courses might store credits differently or as string
        const creds = parseFloat(c.credits) || 0;
        total += creds;
    });

    const badge = document.getElementById('totalCreditsCount');
    if (badge) badge.textContent = total;
}

// Function to refresh schedule (called by addTask, etc)
function refreshSchedule() {
    const courses = getAllCoursesFromGrid();
    displayCourses(courses);
    updateTotalCredits();
}