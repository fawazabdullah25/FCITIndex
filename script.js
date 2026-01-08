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
// UTILITY FUNCTIONS
// ==========================================

function formatCourseCode(subject, code) {
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

        const cleanup = () => {
            modal.style.display = 'none';
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
    let hasCourses = false;

    courses.forEach(course => {
        course.schedules.forEach(schedule => {
            const parsed = parseScheduleTime(schedule);
            if (!parsed) return;
            hasCourses = true;
            earliestMin = Math.min(earliestMin, parsed.startMin);
            latestMin = Math.max(latestMin, parsed.endMin);
        });
    });

    if (!hasCourses) return { startHour: 8, endHour: 17 };

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

    // Remove
    document.querySelectorAll(`.course-box[data-course-code="${courseCode}"]`).forEach(b => b.remove());
    document.querySelectorAll(`.mobile-course-card[data-course-code="${courseCode}"]`).forEach(c => c.remove());

    updateSuggestedCourses();
    showToast(`Removed ${courseCode}`);
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
        if (!isUndo) document.getElementById('modal').style.display = 'none';
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

function showCourseDetails(course) {
    const modal = document.getElementById('detailsModal');
    const content = document.getElementById('detailsContent');
    const removeBtn = document.getElementById('detailsRemoveBtn');

    const codeStr = formatCourseCode(course.subject, course.courseCode);

    const schedulesHtml = course.schedules.map((s, index) => `
        ${index > 0 ? '<hr style="border:0; border-top:1px dashed var(--border-color); margin:10px 0;">' : ''}
        <div class="details-row"><span class="details-label"><img src="icons/days.png" class="section-icon"> Days:</span><span class="details-value">${formatDays(s.days)}</span></div>
        <div class="details-row"><span class="details-label"><img src="icons/time.png" class="section-icon"> Time:</span><span class="details-value">${s.time}</span></div>
        <div class="details-row"><span class="details-label"><img src="icons/location.png" class="section-icon"> Location:</span><span class="details-value">${s.room || 'TBA'}</span></div>
        <div class="details-row"><span class="details-label"><img src="icons/instructor.png" class="section-icon"> Instructor:</span><span class="details-value">${s.instructor || 'TBA'}</span></div>
    `).join('');

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
        modal.style.display = 'none';
    };

    document.getElementById('closeDetailsBtn').onclick = () => modal.style.display = 'none';
    modal.style.display = 'flex';
}

function displayCourses(courses) {
    const container = document.getElementById('timetableContainer');
    if (!container) return;

    currentTimeRange = calculateTimeRange(courses);
    const { startHour, endHour } = currentTimeRange;
    const gridHeight = (endHour - startHour) * PIXELS_PER_HOUR;

    container.innerHTML = `<h3 class="schedule-title">Your Block Schedule</h3>`;

    const grid = document.createElement('div');
    grid.className = 'timetable-grid';
    grid.style.setProperty('--grid-height', `${gridHeight}px`);

    const headerRow = document.createElement('div');
    headerRow.className = 'grid-header';
    headerRow.innerHTML = '<div class="header-cell time-header">Time</div>';
    DAYS.forEach(day => headerRow.innerHTML += `<div class="header-cell">${day}</div>`);
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
        dayColumn.className = 'day-column';
        dayColumn.dataset.day = day;

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
        gridBody.appendChild(dayColumn);
    });

    grid.appendChild(gridBody);
    container.appendChild(grid);

    generateMobileScheduleList(courses, container);

    document.getElementById('scheduleControls').classList.remove('hidden');
    document.querySelector('section').style.display = 'block';
    document.querySelector('main').style.display = 'none';
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
                if (daysWithCourses[name]) daysWithCourses[name].push({ course: c, schedule: s, start: p.startMin });
            });
        });
    });

    DAYS.forEach(day => {
        const dayCourses = daysWithCourses[day];
        if (dayCourses.length === 0) return;

        const group = document.createElement('div');
        group.className = 'mobile-day-group';
        group.innerHTML = `<div class="mobile-day-header">${day}</div>`;

        dayCourses.sort((a, b) => a.start - b.start);

        dayCourses.forEach(({ course, schedule }) => {
            const codeStr = formatCourseCode(course.subject, course.courseCode);
            const card = document.createElement('div');
            card.className = 'mobile-course-card';
            card.dataset.courseCode = codeStr;

            card.innerHTML = `
                <div class="card-header-row">
                    <div class="mobile-course-code">${codeStr}</div>
                    <div class="card-badges">
                        <span class="section-badge">${course.section}</span>
                        <span class="crn-badge">${course.crn}</span>
                        <span class="credits-badge">${course.credits} H</span>
                        <button class="remove-mobile-btn" title="Remove">×</button>
                    </div>
                </div>
                <div class="mobile-course-title">${course.title || ''}</div>
                <div class="course-meta">
                    <div class="meta-row"><img src="icons/time.png" class="meta-icon"> ${schedule.time}</div>
                    <div class="meta-row"><img src="icons/location.png" class="meta-icon"> ${schedule.room || 'TBA'}</div>
                    <div class="meta-row"><img src="icons/instructor.png" class="meta-icon"> ${schedule.instructor || 'TBA'}</div>
                </div>
            `;

            card.querySelector('.remove-mobile-btn').onclick = (e) => {
                e.stopPropagation();
                removeCourse(codeStr);
            };

            group.appendChild(card);
        });

        list.appendChild(group);
    });

    container.appendChild(list);
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

async function showSectionChoices(code) {
    const gender = document.getElementById('gender').value;
    const modal = document.getElementById('modal');
    const titleSpan = document.getElementById('modalTitle')?.querySelector('span');
    const list = document.getElementById('sectionList');

    if (!modal || !list) return;

    titleSpan.textContent = code;
    list.innerHTML = '<p class="loading-msg">Loading sections...</p>';
    modal.style.display = 'flex';

    document.getElementById('filterInstructor').value = '';
    document.getElementById('filterSection').value = '';
    document.getElementById('filterCrn').value = '';
    document.getElementById('filterStartTime').value = '';
    document.getElementById('filterConflict').checked = true;
    document.querySelectorAll('input[name="filterDay"]').forEach(cb => cb.checked = false);

    try {
        const cleanCode = code.replace('-', '');
        const apiUrl = new URL('https://api.kauindex.com/search');
        apiUrl.searchParams.append('termCode', '202602');
        apiUrl.searchParams.append('q', cleanCode);
        apiUrl.searchParams.append('gender', gender);
        apiUrl.searchParams.append('limit', '50');

        const response = await fetch(apiUrl);
        const result = await response.json();
        list.innerHTML = '';

        if (result.data.length === 0) {
            list.innerHTML = '<p class="no-results-msg">No sections found.</p>';
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
        list.innerHTML = '<p class="error-msg">Error fetching sections.</p>';
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

        // Exact Day Match Logic
        if (selectedDays.length > 0) {
            const courseDays = card.dataset.days.split('');
            // Check 1: Length must be equal
            // Check 2: All selected days must be in course days (and vice versa by length check)
            const exactMatch = (courseDays.length === selectedDays.length) && selectedDays.every(d => courseDays.includes(d));
            if (!exactMatch) show = false;
        }

        card.style.display = show ? 'block' : 'none';
    });
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
        if (!seen.has(box.courseData.crn)) {
            courses.push(box.courseData);
            seen.add(box.courseData.crn);
        }
    });
    return courses;
}

function updateSuggestedCourses() {
    if (!currentMajor || !currentTerm) return;
    const onGrid = getCoursesOnGrid();

    const req = termSubjects[currentMajor]?.[currentTerm] || [];
    const sugg = alwaysSuggested[currentMajor]?.[currentTerm] || [];
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
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    populateTimeFilter();

    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') document.body.setAttribute('data-theme', 'light');

    themeToggle?.addEventListener('click', () => {
        const isLight = document.body.getAttribute('data-theme') === 'light';
        if (isLight) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
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

    document.getElementById('major')?.addEventListener('change', function () {
        currentMajor = this.value;
        const blockSelect = document.getElementById('block');
        blockSelect.innerHTML = '<option value="">Select Block</option>';
        (blocksByMajor[this.value] || []).forEach(b => {
            blockSelect.innerHTML += `<option value="${b}">${b}</option>`;
        });
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
    });

    document.getElementById('term')?.addEventListener('change', function () { currentTerm = this.value; });

    document.getElementById('blockForm')?.addEventListener('submit', async function (e) {
        e.preventDefault();
        const gender = document.getElementById('gender').value;
        const block = document.getElementById('block').value;

        if (!gender || !currentMajor || !currentTerm || !block) return alert('Fill all fields');

        const btn = this.querySelector('button');
        btn.textContent = 'Loading...';
        btn.disabled = true;

        try {
            const url = `https://api.kauindex.com/search?termCode=202602&section=${block}&gender=${gender}&level=بكالوريوس&limit=100`;
            const res = await fetch(url);
            const json = await res.json();

            if (json.status === 'success' && json.data.length) {
                const req = termSubjects[currentMajor][currentTerm];
                const filtered = json.data.filter(c => req.includes(formatCourseCode(c.subject, c.courseCode)));
                displayCourses(filtered);
                updateSuggestedCourses();
            } else {
                alert('No schedule found for this block.');
            }
        } catch (err) {
            alert('Error loading schedule.');
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
            document.querySelector('section').style.display = 'none';
            document.querySelector('main').style.display = 'block';
            document.getElementById('blockForm').reset();
            currentMajor = null;
            currentTerm = null;
        }
    });
});