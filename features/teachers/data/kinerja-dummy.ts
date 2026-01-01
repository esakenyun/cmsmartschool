// Helper to generate consistent pseudo-random numbers based on a seed
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export interface KinerjaSummary {
  attendance: {
    totalDays: number;
    present: number; // Tepat Waktu
    late: number; // Terlambat
    percentage: number; // Kehadiran Bulan Ini
  };
  mutabaah: {
    score: string; // "Excellent", "Baik", "Cukup"
    sholat: string; // "Lengkap", "Bolong"
    tilawah: string; // "Rutin", "Jarang"
  };
  journal: {
    totalHours: number;
    teachingHours: number;
    selfDevHours: number;
  };
  permission: {
    totalUsed: number;
    max: number;
    details: {
      sick: number;
      excused: number;
    };
  };
}

export function getKinerjaData(startDate: Date, endDate: Date): KinerjaSummary {
  const start = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const end = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
    23,
    59,
    59
  );

  // Calculate distinct work days in range (excluding sunlight)
  let totalWorkDays = 0;
  const tempDate = new Date(start);
  while (tempDate <= end) {
    if (tempDate.getDay() >= 1 && tempDate.getDay() <= 5) totalWorkDays++;
    tempDate.setDate(tempDate.getDate() + 1);
  }

  if (totalWorkDays === 0) {
    return {
      attendance: { totalDays: 0, present: 0, late: 0, percentage: 0 },
      mutabaah: { score: "-", sholat: "-", tilawah: "-" },
      journal: { totalHours: 0, teachingHours: 0, selfDevHours: 0 },
      permission: { totalUsed: 0, max: 10, details: { sick: 0, excused: 0 } },
    };
  }

  // Generate consistent pseudo-random "stats" based on the month/range
  // Use start date timestamp as seed for the block
  const seed = start.getTime();

  // 1. Attendance Logic
  // Most people are diligent.
  // late events: 0 to 3 times depending on randomness
  const lateCount = Math.floor(seededRandom(seed + 1) * 3);
  // absences: 0 to 2
  const absenceCount = Math.floor(seededRandom(seed + 2) * 2);

  // Scale by range length (approx). The above are "per month" rates approx.
  // If range is small, reduce chance.
  const daysRatio = totalWorkDays / 20; // 20 days standard month

  const actualLate = Math.round(lateCount * daysRatio);
  const actualAbsence = Math.round(absenceCount * daysRatio);
  // Ensure we don't exceed total days
  const validPresence = Math.max(0, totalWorkDays - actualAbsence);
  const presentOnTime = Math.max(0, validPresence - actualLate);

  const attendancePct = Math.round(
    (validPresence / (totalWorkDays || 1)) * 100
  );

  // 2. Mutabaah Logic
  const scoreRoll = seededRandom(seed + 3);
  let score = "Excellent";
  let sholat = "Lengkap";
  let tilawah = "Rutin";

  if (scoreRoll < 0.2) {
    score = "Cukup";
    sholat = "Perlu Perbaikan";
    tilawah = "Jarang";
  } else if (scoreRoll < 0.5) {
    score = "Baik";
    sholat = "Lengkap";
    tilawah = "Jarang";
  }

  // 3. Journal Logic
  // Approx 6-9 hours per day
  const avgHours = 7 + seededRandom(seed + 4) * 2; // 7 to 9
  const totalHours = Math.round(avgHours * validPresence);

  const teachingRatio = 0.6 + seededRandom(seed + 5) * 0.2; // 60-80%
  const teachingHours = Math.round(totalHours * teachingRatio);
  const selfDevHours = Math.max(0, Math.floor(totalHours * 0.1)); // ~10%

  // 4. Permission Logic
  // This usually accumulates over the year, but let's show "used in period" or "cumulative"?
  // The UI shows "2 Hari" and "Max 10 Hari". Usually Max is annual.
  // For this view, let's assume "Used So Far" if large range, or "Used in Period".
  // The user probably wants "Permission taken in this Range".
  const sick = Math.floor(seededRandom(seed + 6) * 1.5 * daysRatio);
  const excused = Math.floor(seededRandom(seed + 7) * 1.5 * daysRatio);
  const totalUsed = sick + excused;

  return {
    attendance: {
      totalDays: totalWorkDays,
      present: presentOnTime,
      late: actualLate,
      percentage: attendancePct,
    },
    mutabaah: {
      score,
      sholat,
      tilawah,
    },
    journal: {
      totalHours,
      teachingHours,
      selfDevHours,
    },
    permission: {
      totalUsed,
      max: 10, // constant
      details: {
        sick,
        excused,
      },
    },
  };
}
