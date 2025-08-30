import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || // trust first forwarded IP
      req.connection?.remoteAddress ||
      req.ip;
    const decision = await aj.protect(req, { requested: 1, ip });

    if (decision.isDenied()) {
      if (decision.reason.isBot())
        return res.status(403).send("Access denied - Bot detected");
      if (decision.reason.isRateLimit())
        return res.status(429).send("Access denied - Rate limit exceeded");
    }

    next();
  } catch (error) {
    console.error("ArcJet middleware error:", error);
    next(error);
  }
};

export default arcjetMiddleware;
