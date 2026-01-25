export type FitStatus = "TIGHT" | "LOOSE" | "PERFECT";

export interface FitResult {
    status: FitStatus;
    color: string;
    overlayClass: string; // CSS class for positioning the gradient
    message: string;
}

export function calculateFit(heightCm: number, weightKg: number, size: string): FitResult {
    // 1. Calculate BMI
    // BMI = kg / m^2
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    // 2. Logic Rules (The "Smoke & Mirrors")

    // Rule A: Too Tight (Heat)
    // Threshold: BMI > 25 (Overweight boundary) AND Size is S/M
    if (bmi > 25 && (size === 'S' || size === 'M')) {
        return {
            status: "TIGHT",
            color: "red",
            overlayClass: "bg-radial-red", // We'll define this via utility or inline style
            message: "High tension detected on chest/torso area. Recommendation: Size U."
        };
    }

    // Rule B: Too Loose (Cold)
    // Threshold: BMI < 18.5 (Underweight boundary) AND Size is L/XL
    if (bmi < 18.5 && (size === 'L' || size === 'XL')) {
        return {
            status: "LOOSE",
            color: "blue",
            overlayClass: "bg-radial-blue",
            message: "Fabric gap detected on shoulders. Fit is too relaxed."
        };
    }

    // Rule C: Perfect (Neutral)
    return {
        status: "PERFECT",
        color: "green",
        overlayClass: "bg-radial-green",
        message: "Optimal fit. Fabric tension is neutral and comfortable."
    };
}
