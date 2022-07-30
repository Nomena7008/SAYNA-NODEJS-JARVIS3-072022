const whiteList = [
	`${process.env.HOST_URL}`,
	`${process.env.LOCAL_HOST1}:${process.env.PORT}`,
	`${process.env.LOCAL_HOST2}:${process.env.PORT}`,
];

const corsOptions = {
	origin: (origin, callback) => {
		if (whiteList.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus:200,
};