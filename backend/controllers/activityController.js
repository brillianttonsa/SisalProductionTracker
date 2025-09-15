import { createNewActivity, getUserActivitiesFromDB } from "../services/activityModel.js";

export const createActivity = async (req, res) => {
    try {
        const userId = req.user.userId
        const newActivity = await createNewActivity(userId,req.body);
        res.status(201).json(newActivity);
    } catch (err) {
        console.log("Error creating activity:", err.message);
        res.status(500).json({error: "Failed to create activity"});
    }
}

export const getUserActivities = async (req, res) => {
    try{
        const userId = req.user.userId;
        const activities = await getUserActivitiesFromDB(userId);
        res.json(activities);
    } catch (err) {
        console.error("Error fetching activities:", err.message);
        res.status(500).json({ error: "Failed to fetch activities" });
  }
}