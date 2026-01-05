const blocksByMajor = {
    CS: ["CS1", "CS2", "CS3"],
    IT: ["IT1", "IT2", "IT3"],
    IS: ["IS1", "IS2", "IS3"]
};

const termSubjects = {
    CS: {
        4: ['CPCS-203', 'CPCS-222', 'MATH-202'],
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
        4: ['ARAB-101', 'ISLS-201'],
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

// Grid configuration constants
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
const DAY_MAP = { U: 'Sunday', M: 'Monday', T: 'Tuesday', W: 'Wednesday', R: 'Thursday' };
const START_HOUR = 8;
const END_HOUR = 20;
const SLOT_DURATION = 30;

// Track current selections for updating suggestions
let currentMajor = null;
let currentTerm = null;
let currentSuggestions = [];

// Parse time string to minutes since midnight
function parseTime(timeStr) {
    const [time, ampm] = timeStr.split(' ');
    let [hour, min] = time.split(':').map(Number);
    if (ampm === 'PM' && hour < 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    return (hour * 60) + min;
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
            resolve(confirm(message)); // Fallback to browser confirm
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

        yesBtn.onclick = () => {
            cleanup();
            resolve(true);
        };

        noBtn.onclick = () => {
            cleanup();
            resolve(false);
        };
    });
}

// Generate time labels for the grid
function generateTimeLabels() {
    const labels = [];
    for (let h = START_HOUR; h < END_HOUR; h++) {
        for (let m = 0; m < 60; m += SLOT_DURATION) {
            const hour = h % 12 || 12;
            const min = m.toString().padStart(2, '0');
            const ampm = h < 12 ? 'AM' : 'PM';
            labels.push(`${hour}:${min} ${ampm}`);
        }
    }
    return labels;
}

// Calculate grid slot from time in minutes
function getSlotFromMinutes(minutes) {
    return Math.floor((minutes - (START_HOUR * 60)) / SLOT_DURATION) + 2;
}

// Parse schedule time and add parsed values to schedule object
function parseScheduleTime(schedule) {
    const timeMatch = schedule.time.match(/(\d{1,2}:\d{2} [AP]M) - (\d{1,2}:\d{2} [AP]M)/);
    if (!timeMatch) return null;

    const startMin = parseTime(timeMatch[1]);
    const endMin = parseTime(timeMatch[2]);

    if (isNaN(startMin) || isNaN(endMin)) return null;

    return { ...schedule, startMin, endMin };
}

// Get list of courses currently on the grid
function getCoursesOnGrid() {
    const grid = document.querySelector('.timetable-grid');
    if (!grid) return [];

    const codes = new Set();
    grid.querySelectorAll('.course-box').forEach(box => {
        const code = box.dataset.courseCode;
        if (code) {
            // Convert "CPCS 203" to "CPCS-203" for comparison
            codes.add(code.replace(' ', '-'));
        }
    });
    return [...codes];
}

// Update suggested courses based on what's on the grid
function updateSuggestedCourses() {
    if (!currentMajor || !currentTerm) return;

    const coursesOnGrid = getCoursesOnGrid();
    const requiredCodes = termSubjects[currentMajor]?.[currentTerm] || [];
    const alwaysSuggest = alwaysSuggested[currentMajor]?.[currentTerm] || [];

    // Find which required/suggested courses are NOT on the grid
    const missingRequired = requiredCodes.filter(code => !coursesOnGrid.includes(code));
    const missingSuggested = alwaysSuggest.filter(code => !coursesOnGrid.includes(code));

    const allSuggestions = [...new Set([...missingRequired, ...missingSuggested])];
    currentSuggestions = allSuggestions;
    showSuggestedCourses(allSuggestions);
}

// Create a course box element
function createCourseBox(course, schedule, startSlot, endSlot, colIndex, isManual = false) {
    const box = document.createElement('div');
    box.className = isManual ? 'course-box manual-add' : 'course-box';
    box.style.gridRow = `${startSlot} / ${endSlot}`;
    box.style.gridColumn = colIndex;
    box.dataset.courseCode = `${course.subject} ${course.courseCode}`;
    box.dataset.startMin = schedule.startMin;
    box.dataset.endMin = schedule.endMin;
    box.dataset.days = schedule.days;

    box.innerHTML = `
        <button class="remove-btn" title="Remove course">×</button>
        <strong>${course.subject} ${course.courseCode}</strong><br>
        ${course.title}<br>
        ${schedule.room || 'TBA'}<br>
        ${course.primaryInstructor || 'TBA'}
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
                if (b.dataset.courseCode === courseName) {
                    b.remove();
                }
            });
            // Update suggestions after removal
            updateSuggestedCourses();
        }
    };

    return box;
}

// Display courses in timetable grid
function displayCourses(courses) {
    const container = document.getElementById('timetableContainer');
    if (!container) return;

    const numSlots = ((END_HOUR - START_HOUR) * 60) / SLOT_DURATION;
    const timeLabels = generateTimeLabels();

    container.innerHTML = `<h3 style="text-align:center; color:#0066cc;">Your Block Schedule (${courses.length} sections found)</h3>`;

    const grid = document.createElement('div');
    grid.className = 'timetable-grid';
    grid.style.gridTemplateRows = `repeat(${numSlots + 1}, 1fr)`;
    grid.style.gridTemplateColumns = `100px repeat(${DAYS.length}, 1fr)`;

    // Create header row
    const timeHeader = document.createElement('div');
    timeHeader.className = 'header time-slot';
    timeHeader.textContent = 'Time';
    grid.appendChild(timeHeader);

    DAYS.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'header';
        dayHeader.textContent = day;
        grid.appendChild(dayHeader);
    });

    // Create time labels
    timeLabels.forEach((label, index) => {
        const timeCell = document.createElement('div');
        timeCell.className = 'time-slot';
        timeCell.textContent = label;
        timeCell.style.gridRow = index + 2;
        timeCell.style.gridColumn = 1;
        grid.appendChild(timeCell);
    });

    // Add course boxes
    courses.forEach(course => {
        course.schedules.forEach(schedule => {
            const parsed = parseScheduleTime(schedule);
            if (!parsed) return;

            const courseDays = parsed.days.split('').map(d => DAY_MAP[d] || '').filter(Boolean);
            const startSlot = getSlotFromMinutes(parsed.startMin);
            const endSlot = Math.ceil((parsed.endMin - (START_HOUR * 60)) / SLOT_DURATION) + 2;

            courseDays.forEach(day => {
                const colIndex = DAYS.indexOf(day) + 2;
                const box = createCourseBox(course, parsed, startSlot, endSlot, colIndex);
                grid.appendChild(box);
            });
        });
    });

    container.appendChild(grid);
    document.getElementById('scheduleControls').style.display = 'block';
    document.querySelector('section').style.display = 'block';
}

// Show suggested course buttons
function showSuggestedCourses(codes) {
    const container = document.getElementById('suggestedButtons');
    if (!container) return;

    container.innerHTML = '';

    if (codes.length === 0) {
        container.innerHTML = '<em style="color:green;">All required courses found in your schedule!</em>';
        return;
    }

    codes.forEach(code => {
        const btn = document.createElement('button');
        btn.textContent = code;
        btn.onclick = () => showSectionChoices(code);
        container.appendChild(btn);
    });
}

// Show section choices in modal
async function showSectionChoices(code) {
    const gender = document.getElementById('gender').value;
    const modal = document.getElementById('modal');
    const titleSpan = document.getElementById('modalTitle')?.querySelector('span');
    const list = document.getElementById('sectionList');

    if (!modal || !titleSpan || !list) return;

    titleSpan.textContent = code;
    list.innerHTML = '<p>Loading sections...</p>';
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
            list.innerHTML = '<p>No sections found for this course.</p>';
            return;
        }

        result.data.forEach(course => {
            const div = document.createElement('div');
            div.style.marginBottom = '15px';
            div.style.padding = '10px';
            div.style.border = '1px solid #ddd';
            div.style.borderRadius = '4px';

            let schedulesText = course.schedules.map(s =>
                `${s.days} ${s.time} (${s.room || 'TBA'})`
            ).join('<br>');

            div.innerHTML = `
                <strong>Section ${course.section || '??'} - ${course.primaryInstructor || 'TBA'}</strong><br>
                ${schedulesText}
            `;

            const addBtn = document.createElement('button');
            addBtn.textContent = 'Add this section';
            addBtn.className = 'add-section';
            addBtn.onclick = async () => {
                const conflict = hasConflict(course);
                if (conflict) {
                    const confirmed = await showConfirmModal(
                        '⚠️ Time Conflict',
                        `This course overlaps with "${conflict}". Add anyway?`
                    );
                    if (!confirmed) return;
                }
                addCourseToGrid(course);
                modal.style.display = 'none';
                // Update suggestions after adding
                updateSuggestedCourses();
            };

            div.appendChild(addBtn);
            list.appendChild(div);
        });

    } catch (error) {
        list.innerHTML = '<p>Error loading sections.</p>';
    }
}

// Add course to existing grid
function addCourseToGrid(course) {
    const grid = document.querySelector('.timetable-grid');
    if (!grid) return;

    course.schedules.forEach(schedule => {
        const parsed = parseScheduleTime(schedule);
        if (!parsed) return;

        const courseDays = parsed.days.split('').map(d => DAY_MAP[d] || '').filter(Boolean);
        const startSlot = getSlotFromMinutes(parsed.startMin);
        const endSlot = Math.ceil((parsed.endMin - (START_HOUR * 60)) / SLOT_DURATION) + 2;

        courseDays.forEach(day => {
            const colIndex = DAYS.indexOf(day) + 2;
            const box = createCourseBox(course, parsed, startSlot, endSlot, colIndex, true);
            grid.appendChild(box);
        });
    });
}

// Check for time conflicts with existing courses
function hasConflict(newCourse) {
    const grid = document.querySelector('.timetable-grid');
    if (!grid) return null;

    const existingBoxes = grid.querySelectorAll('.course-box');

    for (const sched of newCourse.schedules) {
        const parsed = parseScheduleTime(sched);
        if (!parsed) continue;

        const newDays = parsed.days.split('');

        for (const box of existingBoxes) {
            const existingDays = (box.dataset.days || '').split('');
            const existingStart = parseInt(box.dataset.startMin);
            const existingEnd = parseInt(box.dataset.endMin);

            if (isNaN(existingStart) || isNaN(existingEnd)) continue;

            // Check if any days overlap
            const daysOverlap = newDays.some(d => existingDays.includes(d));
            if (!daysOverlap) continue;

            // Check if times overlap
            if (timeRangesOverlap(parsed.startMin, parsed.endMin, existingStart, existingEnd)) {
                return box.dataset.courseCode;
            }
        }
    }
    return null;
}

// Set loading state on submit button
function setLoadingState(loading) {
    const submitBtn = document.querySelector('#blockForm button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = loading;
        submitBtn.textContent = loading ? 'Loading...' : 'Load Block Schedule';
    }
}

// Initialize all event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {

    // Major selection updates block options
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
        if (container) {
            container.innerHTML = '<p>Loading your block schedule...</p>';
        }

        try {
            const apiUrl = new URL('https://api.kauindex.com/search');
            apiUrl.searchParams.append('termCode', '202602');
            apiUrl.searchParams.append('section', block);
            apiUrl.searchParams.append('gender', gender);
            apiUrl.searchParams.append('level', 'بكالوريوس');
            apiUrl.searchParams.append('limit', '100');

            console.log("Fetching from:", apiUrl.toString());

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const result = await response.json();

            if (result.status !== 'success' || !result.data || result.data.length === 0) {
                if (container) {
                    container.innerHTML = '<p>No courses found for this block. Try another?</p>';
                }
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
            if (container) {
                container.innerHTML = '<p>Error loading schedule. Check console or try again later.</p>';
            }
        } finally {
            setLoadingState(false);
        }
    });

    // Manual course search button
    document.getElementById('fetchBtn')?.addEventListener('click', () => {
        const input = document.getElementById('courseInput');
        const code = input?.value.trim().toUpperCase();
        if (code) {
            showSectionChoices(code);
            input.value = '';
        }
    });

    // Allow Enter key in search input
    document.getElementById('courseInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('fetchBtn')?.click();
        }
    });

    // Clear schedule button - only removes course boxes, keeps grid
    document.getElementById('clearScheduleBtn')?.addEventListener('click', async () => {
        const courseBoxes = document.querySelectorAll('.course-box');
        if (courseBoxes.length === 0) return;

        const confirmed = await showConfirmModal(
            'Clear Schedule',
            'Are you sure you want to remove all courses from your schedule?'
        );

        if (confirmed) {
            courseBoxes.forEach(box => box.remove());
            // Update suggestions to show all required/suggested courses again
            updateSuggestedCourses();
        }
    });
});