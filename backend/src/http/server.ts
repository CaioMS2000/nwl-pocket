import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoalRoute } from "./routes/create-goals";
import { getPendingGoalsRoute } from "./routes/get-pending-goals";
import { createCompletionRoute } from "./routes/create-completion";
import { getWeekSummaryRoute } from "./routes/get-week-summary";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(import("@fastify/cors"), {
	origin: "*",
});

// import fastifyCors from "@fastify/cors"
// app.register(fastifyCors, {
// 	origin: "*",
// });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(getPendingGoalsRoute);
app.register(createCompletionRoute);
app.register(getWeekSummaryRoute);

async function BOOT() {
	await app.listen({
		port: 3333,
	});

	console.log("HTTP Server Running");
}

BOOT();
