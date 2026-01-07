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

// Grid configuration
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
const DAY_MAP = { U: 'Sunday', M: 'Monday', T: 'Tuesday', W: 'Wednesday', R: 'Thursday' };
const DAY_ORDER = { U: 0, M: 1, T: 2, W: 3, R: 4 }; // For sorting days in UMTWR order
const isMobile = () => window.innerWidth <= 768;
const PIXELS_PER_HOUR = 80; // Height pixels per hour (increased for more space)
const TIME_PADDING_HOURS = 1; // Padding before earliest and after latest course

// Track current state
let currentMajor = null;
let currentTerm = null;
let currentSuggestions = [];
let currentTimeRange = { startHour: 8, endHour: 20 }; // Default, will be calculated dynamically

// Parse time string to minutes since midnight
function parseTime(timeStr) {
    const [time, ampm] = timeStr.split(' ');
    let [hour, min] = time.split(':').map(Number);
    if (ampm === 'PM' && hour < 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    return (hour * 60) + min;
}

// Format minutes to readable time
function formatTime(minutes) {
    let hour = Math.floor(minutes / 60);
    const min = minutes % 60;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${min.toString().padStart(2, '0')} ${ampm}`;
}

// Check if two time ranges overlap
function timeRangesOverlap(start1, end1, start2, end2) {
    return start1 < end2 && start2 < end1;
}

// Show confirmation modal and return a promise
function showConfirmModal(title, message) {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirmModal');
        const titleEl = document.getElementById('confirmTitle');
        const messageEl = document.getElementById('confirmMessage');
        const yesBtn = document.getElementById('confirmYes');
        const noBtn = document.getElementById('confirmNo');

        if (!modal || !titleEl || !messageEl || !yesBtn || !noBtn) {
            resolve(confirm(message));
            return;
        }

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

// Parse schedule time and add parsed values
function parseScheduleTime(schedule) {
    const timeMatch = schedule.time.match(/(\d{1,2}:\d{2} [AP]M) - (\d{1,2}:\d{2} [AP]M)/);
    if (!timeMatch) return null;

    const startMin = parseTime(timeMatch[1]);
    const endMin = parseTime(timeMatch[2]);

    if (isNaN(startMin) || isNaN(endMin)) return null;

    return { ...schedule, startMin, endMin };
}

// Calculate dynamic time range based on courses
function calculateTimeRange(courses) {
    let earliestMin = 24 * 60;
    let latestMin = 0;

    courses.forEach(course => {
        course.schedules.forEach(schedule => {
            const parsed = parseScheduleTime(schedule);
            if (!parsed) return;
            earliestMin = Math.min(earliestMin, parsed.startMin);
            latestMin = Math.max(latestMin, parsed.endMin);
        });
    });

    // Default if no courses
    if (earliestMin >= latestMin) {
        return { startHour: 8, endHour: 17 };
    }

    // Add padding and round to full hours
    const startHour = Math.max(7, Math.floor(earliestMin / 60) - TIME_PADDING_HOURS);
    const endHour = Math.min(22, Math.ceil(latestMin / 60) + TIME_PADDING_HOURS);

    return { startHour, endHour };
}

// Generate time labels for grid
function generateTimeLabels(startHour, endHour) {
    const labels = [];
    for (let h = startHour; h <= endHour; h++) {
        const hour = h % 12 || 12;
        const ampm = h < 12 ? 'AM' : 'PM';
        labels.push({ hour: h, label: `${hour}:00 ${ampm}` });
    }
    return labels;
}

// Get courses on grid for suggestion updates
function getCoursesOnGrid() {
    const grid = document.querySelector('.timetable-grid');
    if (!grid) return [];

    const codes = new Set();
    grid.querySelectorAll('.course-box').forEach(box => {
        const code = box.dataset.courseCode;
        if (code) codes.add(code.replace(' ', '-'));
    });
    return [...codes];
}

// Update suggested courses
function updateSuggestedCourses() {
    if (!currentMajor || !currentTerm) return;

    const coursesOnGrid = getCoursesOnGrid();
    const requiredCodes = termSubjects[currentMajor]?.[currentTerm] || [];
    const alwaysSuggest = alwaysSuggested[currentMajor]?.[currentTerm] || [];

    const missingRequired = requiredCodes.filter(code => !coursesOnGrid.includes(code));
    const missingSuggested = alwaysSuggest.filter(code => !coursesOnGrid.includes(code));

    const allSuggestions = [...new Set([...missingRequired, ...missingSuggested])];
    currentSuggestions = allSuggestions;
    showSuggestedCourses(allSuggestions);
}

// Create course box with pixel-based positioning
function createCourseBox(course, schedule, isManual = false) {
    const box = document.createElement('div');
    box.className = 'course-box';
    box.dataset.courseCode = `${course.subject} ${course.courseCode}`;
    box.dataset.startMin = schedule.startMin;
    box.dataset.endMin = schedule.endMin;
    box.dataset.days = schedule.days;

    // Calculate position based on time (percentage within the grid)
    // The grid shows time from startHour to endHour, so total duration is (endHour - startHour) hours
    const gridStartMin = currentTimeRange.startHour * 60;
    const totalGridMinutes = (currentTimeRange.endHour - currentTimeRange.startHour) * 60;

    const topPercent = ((schedule.startMin - gridStartMin) / totalGridMinutes) * 100;
    const heightPercent = ((schedule.endMin - schedule.startMin) / totalGridMinutes) * 100;

    box.style.top = `${topPercent}%`;
    box.style.height = `${heightPercent}%`;

    box.innerHTML = `
        <button class="remove-btn" title="Remove course">×</button>
        <div class="course-code">${course.subject} ${course.courseCode}</div>
        <div class="course-section-line">Sec ${course.section || '?'} | ${course.crn || '??'}</div>
        <div class="course-hover-details">
            <div class="detail-item">🕐 ${schedule.time || 'TBA'}</div>
            <div class="detail-item">📍 ${schedule.room || 'TBA'}</div>
            <div class="detail-item">👨‍🏫 ${schedule.instructor || course.primaryInstructor || 'TBA'}</div>
            ${course.credits ? `<div class="detail-item">📚 ${course.credits} Credits</div>` : ''}
        </div>
    `;

    box.querySelector('.remove-btn').onclick = async (e) => {
        e.stopPropagation();
        const courseName = `${course.subject} ${course.courseCode}`;
        const confirmed = await showConfirmModal(
            'Remove Course',
            `Remove ${courseName} from your schedule?`
        );
        if (confirmed) {
            document.querySelectorAll('.course-box').forEach(b => {
                if (b.dataset.courseCode === courseName) b.remove();
            });
            updateSuggestedCourses();
        }
    };

    return box;
}

// Display courses in timetable grid with dynamic time range
function displayCourses(courses) {
    const container = document.getElementById('timetableContainer');
    if (!container) return;

    // Calculate dynamic time range
    currentTimeRange = calculateTimeRange(courses);
    const { startHour, endHour } = currentTimeRange;
    const timeLabels = generateTimeLabels(startHour, endHour);
    const gridHeight = (endHour - startHour) * PIXELS_PER_HOUR;

    container.innerHTML = `
        <h3 class="schedule-title">Your Block Schedule</h3>
    `;

    // Create grid container
    const grid = document.createElement('div');
    grid.className = 'timetable-grid';
    grid.style.setProperty('--grid-height', `${gridHeight}px`);

    // Create header row
    const headerRow = document.createElement('div');
    headerRow.className = 'grid-header';

    const timeHeader = document.createElement('div');
    timeHeader.className = 'header-cell time-header';
    timeHeader.textContent = 'Time';
    headerRow.appendChild(timeHeader);

    // Use abbreviated day names on mobile
    const dayNames = DAYS;

    DAYS.forEach((day, index) => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'header-cell day-header';
        dayHeader.textContent = dayNames[index];
        dayHeader.dataset.day = day; // Keep full name for data reference
        headerRow.appendChild(dayHeader);
    });
    grid.appendChild(headerRow);

    // Create body with time column and day columns
    const gridBody = document.createElement('div');
    gridBody.className = 'grid-body';

    // Time labels column - use same positioning formula as course boxes
    const timeColumn = document.createElement('div');
    timeColumn.className = 'time-column';
    const totalGridMinutes = (endHour - startHour) * 60;

    timeLabels.forEach((t) => {
        const timeLabel = document.createElement('div');
        timeLabel.className = 'time-label';
        // Position each label at its hour mark using minutes (same as course positioning)
        const labelMinutes = (t.hour - startHour) * 60;
        const topPercent = (labelMinutes / totalGridMinutes) * 100;
        timeLabel.style.top = `${topPercent}%`;
        timeLabel.textContent = t.label;
        timeColumn.appendChild(timeLabel);
    });
    gridBody.appendChild(timeColumn);

    // Day columns
    DAYS.forEach((day, dayIndex) => {
        const dayColumn = document.createElement('div');
        dayColumn.className = 'day-column';
        dayColumn.dataset.day = day;

        // Add hour lines - use same positioning as time labels
        for (let h = startHour; h <= endHour; h++) {
            const line = document.createElement('div');
            line.className = 'hour-line';
            const lineMinutes = (h - startHour) * 60;
            const topPercent = (lineMinutes / totalGridMinutes) * 100;
            line.style.top = `${topPercent}%`;
            dayColumn.appendChild(line);
        }

        // Add courses for this day
        courses.forEach(course => {
            course.schedules.forEach(schedule => {
                const parsed = parseScheduleTime(schedule);
                if (!parsed) return;

                // Sort days in UMTWR order
                const sortedDays = parsed.days.split('')
                    .sort((a, b) => (DAY_ORDER[a] ?? 99) - (DAY_ORDER[b] ?? 99))
                    .join('');
                const courseDays = sortedDays.split('').map(d => DAY_MAP[d] || '').filter(Boolean);
                if (!courseDays.includes(day)) return;

                const box = createCourseBox(course, parsed);
                box.courseData = course; // Store for grid reconstruction
                dayColumn.appendChild(box);
            });
        });

        gridBody.appendChild(dayColumn);
    });

    grid.appendChild(gridBody);
    container.appendChild(grid);

    // Generate mobile schedule list view (card-based)
    generateMobileScheduleList(courses, container);

    // Show schedule controls and suggestions, hide form
    document.getElementById('scheduleControls').style.display = 'block';
    document.querySelector('section').style.display = 'block';
    document.querySelector('main').style.display = 'none';
}

// Generate mobile-friendly card-based schedule list
function generateMobileScheduleList(courses, container) {
    // Remove existing mobile list if any
    const existingList = container.querySelector('.mobile-schedule-list');
    if (existingList) existingList.remove();

    const mobileList = document.createElement('div');
    mobileList.className = 'mobile-schedule-list';

    // Group courses by day
    const coursesByDay = {};
    DAYS.forEach(day => coursesByDay[day] = []);

    courses.forEach(course => {
        course.schedules.forEach(sched => {
            const parsed = parseScheduleTime(sched);
            if (!parsed) return;

            const sortedDays = parsed.days.split('')
                .sort((a, b) => (DAY_ORDER[a] ?? 99) - (DAY_ORDER[b] ?? 99));

            sortedDays.forEach(dayCode => {
                const dayName = DAY_MAP[dayCode];
                if (dayName && coursesByDay[dayName]) {
                    coursesByDay[dayName].push({
                        course,
                        schedule: sched,
                        time: parsed.time || sched.time
                    });
                }
            });
        });
    });

    // Generate cards for each day
    DAYS.forEach(day => {
        const dayCourses = coursesByDay[day];
        if (dayCourses.length === 0) return;

        const dayGroup = document.createElement('div');
        dayGroup.className = 'mobile-day-group';

        const dayHeader = document.createElement('div');
        dayHeader.className = 'mobile-day-header';
        dayHeader.textContent = day;
        dayGroup.appendChild(dayHeader);

        // Sort by start time
        dayCourses.sort((a, b) => {
            const aTime = a.schedule.time?.split(' - ')[0] || '';
            const bTime = b.schedule.time?.split(' - ')[0] || '';
            return aTime.localeCompare(bTime);
        });

        dayCourses.forEach(({ course, schedule }) => {
            const card = document.createElement('div');
            card.className = 'mobile-course-card';
            card.dataset.courseCode = `${course.subject} ${course.courseCode}`;

            card.innerHTML = `
                <div class="card-badges">
                    <span class="section-badge">${course.section || '??'}</span>
                    <span class="crn-badge">${course.crn || '??'}</span>
                </div>
                <div class="course-code">${course.subject} ${course.courseCode}</div>
                <div class="course-title">${course.title || ''}</div>
                <div class="course-meta">
                    <div class="meta-row">🕐 ${schedule.time || 'TBA'}</div>
                    <div class="meta-row">📍 ${schedule.room || 'TBA'}</div>
                    <div class="meta-row">👨‍🏫 ${schedule.instructor || course.primaryInstructor || 'TBA'}</div>
                    ${course.credits ? `<div class="meta-row">📚 ${course.credits} Credits</div>` : ''}
                </div>
                <button class="remove-mobile-btn" title="Remove">✕ REMOVE</button>
            `;

            card.querySelector('.remove-mobile-btn').onclick = async (e) => {
                e.stopPropagation();
                const courseName = `${course.subject} ${course.courseCode}`;
                const confirmed = await showConfirmModal(
                    'Remove Course',
                    `Remove ${courseName} from your schedule?`
                );
                if (confirmed) {
                    // Remove from both grid and mobile list
                    document.querySelectorAll('.course-box').forEach(b => {
                        if (b.dataset.courseCode === courseName) b.remove();
                    });
                    document.querySelectorAll('.mobile-course-card').forEach(c => {
                        if (c.dataset.courseCode === courseName) c.remove();
                    });
                    updateSuggestedCourses();
                }
            };

            dayGroup.appendChild(card);
        });

        mobileList.appendChild(dayGroup);
    });

    container.appendChild(mobileList);
}

// Show suggested course buttons
function showSuggestedCourses(codes) {
    const container = document.getElementById('suggestedButtons');
    if (!container) return;

    container.innerHTML = '';

    if (codes.length === 0) {
        container.innerHTML = '<em class="all-found-msg">All required courses found in your schedule!</em>';
        return;
    }

    codes.forEach(code => {
        const btn = document.createElement('button');
        btn.textContent = code;
        btn.onclick = () => showSectionChoices(code);
        container.appendChild(btn);
    });
}

// Format day codes to readable text (sorted in UMTWR order)
function formatDays(days) {
    const dayNames = {
        U: 'Sun', M: 'Mon', T: 'Tue', W: 'Wed', R: 'Thu'
    };
    // Sort days in UMTWR order before formatting
    const sortedDays = days.split('')
        .sort((a, b) => (DAY_ORDER[a] ?? 99) - (DAY_ORDER[b] ?? 99));
    return sortedDays.map(d => dayNames[d] || d).join(', ');
}

// Show section choices in modal with improved info display
async function showSectionChoices(code) {
    const gender = document.getElementById('gender').value;
    const modal = document.getElementById('modal');
    const titleSpan = document.getElementById('modalTitle')?.querySelector('span');
    const list = document.getElementById('sectionList');
    const filtersPanel = document.getElementById('filtersPanel');

    if (!modal || !titleSpan || !list) return;

    titleSpan.textContent = code;
    list.innerHTML = '<p class="loading-msg">Loading sections...</p>';

    // Reset and hide filters
    if (filtersPanel) filtersPanel.style.display = 'none';
    document.getElementById('filterInstructor').value = '';
    document.getElementById('filterSection').value = '';
    document.getElementById('filterDay').value = '';
    document.getElementById('filterStartTime').value = '';

    modal.style.display = 'flex';

    try {
        const apiUrl = new URL('https://api.kauindex.com/search');
        apiUrl.searchParams.append('termCode', '202602');
        apiUrl.searchParams.append('q', code.replace('-', ''));
        apiUrl.searchParams.append('gender', gender);
        apiUrl.searchParams.append('limit', '50');

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error();

        const result = await response.json();
        list.innerHTML = '';

        if (result.data.length === 0) {
            list.innerHTML = '<p class="no-results-msg">No sections found for this course.</p>';
            return;
        }

        result.data.forEach(course => {
            const card = document.createElement('div');
            card.className = 'section-card';

            // Add data attributes for filtering
            const schedDays = course.schedules.map(s => s.days || '').join('');
            const schedStartTime = course.schedules[0]?.time?.split(' - ')[0] || '';
            const schedTimeValue = schedStartTime.replace(/(\d{1,2}):(\d{2}) ([AP]M)/, (_, h, m, ap) => {
                let hour = parseInt(h);
                if (ap === 'PM' && hour !== 12) hour += 12;
                if (ap === 'AM' && hour === 12) hour = 0;
                return `${hour.toString().padStart(2, '0')}:${m}`;
            });

            card.dataset.instructor = course.schedules[0]?.instructor || course.primaryInstructor || '';
            card.dataset.section = course.section || '';
            card.dataset.days = schedDays;
            card.dataset.startTime = schedTimeValue;

            // Section header with course name on left, section/CRN on right
            const header = document.createElement('div');
            header.className = 'section-header';
            header.innerHTML = `
                <span class="section-course-name">${course.subject}-${course.courseCode}</span>
                <span class="section-info-right">
                    <span class="section-number">Sec ${course.section || '??'}</span>
                    <span class="section-crn">${course.crn || '??'}</span>
                </span>
            `;
            card.appendChild(header);

            // Section details
            const details = document.createElement('div');
            details.className = 'section-details';

            // Schedule info for each time slot
            course.schedules.forEach(sched => {
                const schedRow = document.createElement('div');
                schedRow.className = 'schedule-row';
                schedRow.innerHTML = `
                    <div class="detail-row">
                        <span class="detail-label">📅 Days:</span>
                        <span class="detail-value">${formatDays(sched.days)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">🕐 Time:</span>
                        <span class="detail-value">${sched.time}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">📍 Location:</span>
                        <span class="detail-value">${sched.room || 'TBA'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">👨‍🏫 Instructor:</span>
                        <span class="detail-value">${sched.instructor || course.primaryInstructor || 'TBA'}</span>
                    </div>
                    ${course.credits ? `<div class="detail-row">
                        <span class="detail-label">📚 Credits:</span>
                        <span class="detail-value">${course.credits}</span>
                    </div>` : ''}
                    </div>
                `;
                details.appendChild(schedRow);
            });

            card.appendChild(details);

            // Add button
            const addBtn = document.createElement('button');
            addBtn.textContent = 'ADD THIS SECTION';
            addBtn.className = 'add-section-btn';
            addBtn.onclick = async () => {
                const conflict = hasConflict(course);
                if (conflict) {
                    const confirmed = await showConfirmModal(
                        '⚠️ Time Conflict',
                        `This course overlaps with "${conflict}". Remove "${conflict}" and add this course instead?`
                    );
                    if (!confirmed) return;
                    removeConflictingCourse(conflict);
                }
                addCourseToGrid(course);
                modal.style.display = 'none';
                updateSuggestedCourses();
            };
            card.appendChild(addBtn);

            list.appendChild(card);
        });

    } catch (error) {
        list.innerHTML = '<p class="error-msg">Error loading sections. Please try again.</p>';
    }
}

// Get all courses currently on the grid
function getAllCoursesFromGrid() {
    const courses = [];
    const seenCRNs = new Set();

    document.querySelectorAll('.course-box').forEach(box => {
        // Store course data in dataset for reconstruction
        const courseData = box.courseData;
        if (courseData && !seenCRNs.has(courseData.crn)) {
            seenCRNs.add(courseData.crn);
            courses.push(courseData);
        }
    });

    return courses;
}

// Check if course requires time range expansion
function needsTimeRangeExpansion(course) {
    for (const schedule of course.schedules) {
        const parsed = parseScheduleTime(schedule);
        if (!parsed) continue;

        const startHour = Math.floor(parsed.startMin / 60);
        const endHour = Math.ceil(parsed.endMin / 60);

        if (startHour < currentTimeRange.startHour + TIME_PADDING_HOURS ||
            endHour > currentTimeRange.endHour - TIME_PADDING_HOURS) {
            return true;
        }
    }
    return false;
}

// Add course to existing grid (or rebuild if time range needs expansion)
function addCourseToGrid(course) {
    // Check if we need to expand the time range
    if (needsTimeRangeExpansion(course)) {
        // Collect all existing courses
        const existingCourses = getAllCoursesFromGrid();
        existingCourses.push(course);

        // Rebuild the entire grid with new time range
        displayCourses(existingCourses);
        return;
    }

    // Otherwise, just add to existing grid
    const gridBody = document.querySelector('.grid-body');
    if (!gridBody) return;

    course.schedules.forEach(schedule => {
        const parsed = parseScheduleTime(schedule);
        if (!parsed) return;

        const courseDays = parsed.days.split('').map(d => DAY_MAP[d] || '').filter(Boolean);

        courseDays.forEach(day => {
            const dayColumn = gridBody.querySelector(`.day-column[data-day="${day}"]`);
            if (dayColumn) {
                const box = createCourseBox(course, parsed, true);
                box.courseData = course; // Store for later reconstruction
                dayColumn.appendChild(box);
            }
        });
    });

    // Regenerate mobile schedule list with all current courses
    const allCourses = getAllCoursesFromGrid();
    const container = document.getElementById('timetableContainer');
    if (container) {
        generateMobileScheduleList(allCourses, container);
    }
}

// Check for time conflicts
function hasConflict(newCourse) {
    const gridBody = document.querySelector('.grid-body');
    if (!gridBody) return null;

    const existingBoxes = gridBody.querySelectorAll('.course-box');

    for (const sched of newCourse.schedules) {
        const parsed = parseScheduleTime(sched);
        if (!parsed) continue;

        const newDays = parsed.days.split('');

        for (const box of existingBoxes) {
            const existingDays = (box.dataset.days || '').split('');
            const existingStart = parseInt(box.dataset.startMin);
            const existingEnd = parseInt(box.dataset.endMin);

            if (isNaN(existingStart) || isNaN(existingEnd)) continue;

            const daysOverlap = newDays.some(d => existingDays.includes(d));
            if (!daysOverlap) continue;

            if (timeRangesOverlap(parsed.startMin, parsed.endMin, existingStart, existingEnd)) {
                return box.dataset.courseCode;
            }
        }
    }
    return null;
}

// Remove conflicting course
function removeConflictingCourse(courseCode) {
    const gridBody = document.querySelector('.grid-body');
    if (!gridBody) return;

    gridBody.querySelectorAll('.course-box').forEach(box => {
        if (box.dataset.courseCode === courseCode) box.remove();
    });
}

// Set loading state
function setLoadingState(loading) {
    const submitBtn = document.querySelector('#blockForm button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = loading;
        submitBtn.textContent = loading ? 'Loading...' : 'Load Block Schedule';
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');

    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.textContent = '🌙';
    }

    themeToggle?.addEventListener('click', () => {
        const isLight = document.body.getAttribute('data-theme') === 'light';
        if (isLight) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            if (themeIcon) themeIcon.textContent = '🌙';
        }
    });

    // Filter toggle in modal
    document.getElementById('filterToggle')?.addEventListener('click', () => {
        const panel = document.getElementById('filtersPanel');
        if (panel) {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
    });

    // Filter functionality - filter section cards as user types/selects
    function applyFilters() {
        const instructorFilter = document.getElementById('filterInstructor')?.value.toLowerCase() || '';
        const sectionFilter = document.getElementById('filterSection')?.value.toUpperCase() || '';
        const dayFilter = document.getElementById('filterDay')?.value || '';
        const startTimeFilter = document.getElementById('filterStartTime')?.value || '';

        document.querySelectorAll('.section-card').forEach(card => {
            const instructor = card.dataset.instructor?.toLowerCase() || '';
            const section = card.dataset.section?.toUpperCase() || '';
            const days = card.dataset.days || '';
            const startTime = card.dataset.startTime || '';

            let show = true;

            if (instructorFilter && !instructor.includes(instructorFilter)) show = false;
            if (sectionFilter && !section.includes(sectionFilter)) show = false;
            if (dayFilter && !days.includes(dayFilter)) show = false;
            if (startTimeFilter && startTime < startTimeFilter) show = false;

            card.style.display = show ? 'block' : 'none';
        });
    }

    // Attach filter event listeners
    ['filterInstructor', 'filterSection', 'filterDay', 'filterStartTime'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', applyFilters);
        document.getElementById(id)?.addEventListener('change', applyFilters);
    });

    // Edit mode toggle
    document.getElementById('editModeToggle')?.addEventListener('click', function () {
        document.body.classList.toggle('edit-mode');
        this.classList.toggle('active');
        this.textContent = document.body.classList.contains('edit-mode') ? '✓ Editing' : '✏️ Edit Mode';

        // Update mobile view - hide empty days
        document.querySelectorAll('.mobile-day-group').forEach(dayGroup => {
            const hasCards = dayGroup.querySelectorAll('.mobile-course-card').length > 0;
            dayGroup.style.display = hasCards ? '' : 'none';
        });
    });

    // Major selection
    document.getElementById('major')?.addEventListener('change', function () {
        const major = this.value;
        currentMajor = major;
        const blockSelect = document.getElementById('block');
        if (!blockSelect) return;

        blockSelect.innerHTML = '<option value="">Select Block</option>';

        if (major && blocksByMajor[major]) {
            blocksByMajor[major].forEach(block => {
                const option = document.createElement('option');
                option.value = block;
                option.textContent = block;
                blockSelect.appendChild(option);
            });
        }
    });

    // Year selection - populate term dropdown
    document.getElementById('year')?.addEventListener('change', function () {
        const year = parseInt(this.value);
        const termSelect = document.getElementById('term');
        if (!termSelect) return;

        termSelect.innerHTML = '<option value="">Select Term</option>';

        if (year === 2) {
            // Year 2 only has Term 2 (which is internal term 4)
            termSelect.innerHTML += '<option value="4">Term 2 (First in Major)</option>';
        } else if (year >= 3 && year <= 5) {
            // Years 3-5 have Term 1 and Term 2
            const baseTermValue = (year - 3) * 2 + 5; // Year 3 = 5,6; Year 4 = 7,8; Year 5 = 9,10
            termSelect.innerHTML += `<option value="${baseTermValue}">Term 1</option>`;
            termSelect.innerHTML += `<option value="${baseTermValue + 1}">Term 2</option>`;
        }
    });

    // Term selection
    document.getElementById('term')?.addEventListener('change', function () {
        currentTerm = this.value;
    });

    // Form submission
    document.getElementById('blockForm')?.addEventListener('submit', async function (e) {
        e.preventDefault();

        const gender = document.getElementById('gender').value;
        const term = document.getElementById('term').value;
        const major = document.getElementById('major').value;
        const block = document.getElementById('block').value;

        if (!gender || !term || !major || !block) {
            alert("Please fill all fields!");
            return;
        }

        currentMajor = major;
        currentTerm = term;

        console.log("Loading schedule for:", { gender, term, major, block });
        setLoadingState(true);

        const container = document.getElementById('timetableContainer');
        if (container) container.innerHTML = '<p class="loading-msg">Loading your block schedule...</p>';

        try {
            const apiUrl = new URL('https://api.kauindex.com/search');
            apiUrl.searchParams.append('termCode', '202602');
            apiUrl.searchParams.append('section', block);
            apiUrl.searchParams.append('gender', gender);
            apiUrl.searchParams.append('level', 'بكالوريوس');
            apiUrl.searchParams.append('limit', '100');

            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`API error: ${response.status}`);

            const result = await response.json();

            if (result.status !== 'success' || !result.data || result.data.length === 0) {
                if (container) container.innerHTML = '<p class="no-results-msg">No courses found for this block. Try another?</p>';
                setLoadingState(false);
                return;
            }

            const requiredBlockCodes = termSubjects[major]?.[term] || [];
            const filteredCourses = result.data.filter(course =>
                requiredBlockCodes.includes(`${course.subject}-${course.courseCode}`)
            );

            const fetchedCodes = result.data.map(c => `${c.subject}-${c.courseCode}`);
            const missingBlock = requiredBlockCodes.filter(code => !fetchedCodes.includes(code));
            const alwaysSuggest = alwaysSuggested[major]?.[term] || [];
            const allSuggestions = [...new Set([...missingBlock, ...alwaysSuggest])];

            currentSuggestions = allSuggestions;

            displayCourses(filteredCourses.length > 0 ? filteredCourses : []);
            showSuggestedCourses(allSuggestions);

        } catch (error) {
            console.error(error);
            if (container) container.innerHTML = '<p class="error-msg">Error loading schedule. Check console or try again later.</p>';
        } finally {
            setLoadingState(false);
        }
    });

    // Manual course search
    document.getElementById('fetchBtn')?.addEventListener('click', () => {
        const input = document.getElementById('courseInput');
        const code = input?.value.trim().toUpperCase();
        if (code) {
            showSectionChoices(code);
            input.value = '';
        }
    });

    // Enter key in search
    document.getElementById('courseInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('fetchBtn')?.click();
        }
    });

    // Reset schedule (always resets even when no courses)
    document.getElementById('clearScheduleBtn')?.addEventListener('click', async () => {
        const courseBoxes = document.querySelectorAll('.course-box');

        // Only show confirmation if there are courses to remove
        if (courseBoxes.length > 0) {
            const confirmed = await showConfirmModal(
                'Reset Schedule',
                'Are you sure you want to reset and start over?'
            );
            if (!confirmed) return;
        }

        // Remove all courses
        courseBoxes.forEach(box => box.remove());

        // Hide schedule and suggestions, show form
        document.getElementById('timetableContainer').innerHTML = '';
        document.getElementById('scheduleControls').style.display = 'none';
        document.querySelector('section').style.display = 'none';
        document.querySelector('main').style.display = 'block';

        // Reset form selections
        document.getElementById('year').value = '';
        document.getElementById('term').innerHTML = '<option value="">Term</option>';
        document.getElementById('major').value = '';
        document.getElementById('block').innerHTML = '<option value="">Select Block</option>';

        currentMajor = null;
        currentTerm = null;
        currentSuggestions = [];
    });
});