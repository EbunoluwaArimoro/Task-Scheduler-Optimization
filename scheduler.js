// =============================================================
// Task Scheduler & Complexity Analysis
// =============================================================

// 1. DATA INPUT
// Array of task objects.
const tasks = [
    { name: "Email Team",      start: 900,  end: 1000, priority: "High" },
    { name: "Client Meeting",  start: 930,  end: 1030, priority: "High" }, // Overlaps with Email
    { name: "Code Review",     start: 1100, end: 1200, priority: "Medium" },
    { name: "Lunch",           start: 1200, end: 1300, priority: "Low" },
    { name: "Project Sync",    start: 1230, end: 1330, priority: "High" }, // Overlaps with Lunch
    { name: "Documentation",   start: 1400, end: 1600, priority: "Medium" }
];

console.log("--- Initial Task List ---");
console.log(tasks);

// =============================================================
// FEATURE 1: SORT TASKS BY START TIME
// Time Complexity: O(n log n)
// Explanation: We use Timsort (V8 engine's default), which is more efficient 
// than O(n^2) bubble sort.
// =============================================================
function sortTasks(taskList) {
    // [...taskList] creates a shallow copy so we don't mutate the original yet
    return [...taskList].sort((a, b) => a.start - b.start);
}

// =============================================================
// FEATURE 2: GROUP TASKS BY PRIORITY
// Time Complexity: O(n)
// Explanation: We iterate through the list exactly once. 
// Hash Map insertion is O(1).
// =============================================================
function groupTasksByPriority(taskList) {
    const groups = {
        High: [],
        Medium: [],
        Low: []
    };

    taskList.forEach(task => {
        if (groups[task.priority]) {
            groups[task.priority].push(task);
        } else {
            groups[task.priority] = [task];
        }
    });

    return groups;
}

// =============================================================
// FEATURE 3: DETECT OVERLAPPING TASKS
// Time Complexity: O(n log n)
// Explanation: Sorting takes O(n log n). The subsequent pass is O(n).
// This is much better than the naive O(n^2) approach of comparing every task to every other task.
// =============================================================
function detectOverlaps(taskList) {
    const sortedTasks = sortTasks(taskList);
    const overlaps = [];

    for (let i = 0; i < sortedTasks.length - 1; i++) {
        const current = sortedTasks[i];
        const next = sortedTasks[i + 1];

        // If the NEXT task starts before the CURRENT task ends, they overlap.
        if (next.start < current.end) {
            overlaps.push({
                status: "Conflict",
                task1: current.name,
                task2: next.name,
                time: `${next.start} - ${current.end}`
            });
        }
    }
    return overlaps;
}

// =============================================================
// OPTIONAL: MEMORY USAGE ESTIMATION
// Space Complexity Analysis:
// The Task list takes O(n) space.
// =============================================================
function estimateMemory(taskList) {
    const jsonString = JSON.stringify(taskList);
    const bytes = new TextEncoder().encode(jsonString).length;
    console.log(`\nApproximate Memory Usage: ${bytes} bytes`);
}

// =============================================================
// EXECUTION & TESTING
// =============================================================

console.log("\n--- 1. Sorted Tasks (O(n log n)) ---");
const sorted = sortTasks(tasks);
console.log(sorted.map(t => `${t.start}: ${t.name}`));

console.log("\n--- 2. Grouped by Priority (O(n)) ---");
console.log(groupTasksByPriority(tasks));

console.log("\n--- 3. Overlap Detection (O(n log n)) ---");
console.log(detectOverlaps(tasks));

estimateMemory(tasks);