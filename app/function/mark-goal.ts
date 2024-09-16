import { checkbox } from "@inquirer/prompts";
import { GoalsManager } from "../app";

export const markGoal = async () => {
	const allMetas = GoalsManager.getGoals()

	if (allMetas.length === 0) {
		console.log("Nenhuma meta cadastrada");
		return;
	}
	
	const selectedGoals = await checkbox({
		message: "",
		choices: allMetas.map((goal) => ({
			value: goal.name,
			checked: goal.check,
		})),
		instructions: false,
	});

	for (const goal of allMetas) {
		goal.check = false;
	}

	for (const selectedGoal of selectedGoals) {
		const goal = allMetas.find(
			(goal) => goal.name === selectedGoal
		);

		if (goal) {
			goal.check = true;
		}
	}
};
