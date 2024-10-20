const { nanoid } = require("nanoid");
const URL = require("../models/url");

const handleGenerateNewURL = async (req, res) => {
    try {
        const body = req.body;

        if (!body.url)
            res.status(400).json({
                success: false,
                message: "URL is required",
            });

        const shortID = nanoid(8);

        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });

        res.render("home", {
            id: shortID
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const handleGetRedirectURL = async (req, res) => {
    try {
        const shortId = req.params.shortId;

        const response = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            }
        );

        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found",
            });
        }

        // Ensure redirectURL is a valid URL
        const redirectURL = response.redirectURL.startsWith("http")
            ? response.redirectURL
            : `http://${response.redirectURL}`;

        res.redirect(redirectURL);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const handleGetURLAnalytics = async (req, res) => {
    try {
        const shortId = req.params.shortId;

        if (!shortId)
            res.status(400).json({
                success: false,
                message: "Short ID is required",
            });

        const response = await URL.findOne({ shortId });

        if (!response) {
            res.status(404).json({
                success: false,
                message: `No analytics found for ID: ${shortId}`,
            });
        }

        const numberOfClicks = response.visitHistory.length;

        res.json({
            success: true,
            analytics: {
                clicks: numberOfClicks,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
};

module.exports = {
    handleGenerateNewURL,
    handleGetRedirectURL,
    handleGetURLAnalytics,
};
