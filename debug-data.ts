import { generateTendikDetail } from "./features/teachers/data/data-tendik";
import { getAggregatedTeacherStats } from "./features/teachers/utils/data-mapper";
import { getTeacherStats } from "./features/principal/utils/utils";
import { guruList } from "./features/teachers/data/data-guru";

console.log("Starting Debug...");

// 1. Check Guru List
console.log("Guru List Length:", guruList.length);
console.log(
  "Guru Names:",
  guruList.map((g) => g.nama)
);

// 2. Generate Data
console.log("Generating Data...");
const data = generateTendikDetail();
console.log("Attendance Count:", data.attendance.length);
console.log("First Attendance Item:", data.attendance[0]);

// 3. Test Filtering (Guru Dashboard Logic - Data Mapper)
const teacherName = "Dian Mulyawati S.PD";
const startDate = new Date(2025, 5, 1); // June 1
const endDate = new Date(2025, 5, 30); // June 30

console.log(
  `Filtering for ${teacherName} from ${startDate} to ${endDate} using data-mapper...`
);
const aggStats = getAggregatedTeacherStats(
  data,
  teacherName,
  startDate,
  endDate
);
console.log("Aggregated Stats:", JSON.stringify(aggStats, null, 2));

// 4. Test Filtering (Principal Dashboard Logic - Principal Utils)
console.log(
  `Filtering for ${teacherName} from ${startDate} to ${endDate} using principal-utils...`
);

// We can't easily import the internal data from utils.ts because it's not exported,
// but we can call getTeacherStats which uses it internally IF the module executed correctly.
// However, since we are running this script outside of the app context, the side-effect in utils.ts
// (calling generateTendikDetail at top level) will run when we import it.
try {
  const principalStats = getTeacherStats(teacherName, startDate, endDate);
  console.log("Principal Stats:", JSON.stringify(principalStats, null, 2));
} catch (e) {
  console.error("Error calling getTeacherStats:", e);
}

console.log("Debug Complete.");
