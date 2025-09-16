import { createNewActivity, getUserActivitiesFromDB,updateActivityDB, deleteActivityFromDB } from "../services/activityModel.js";

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
        console.log(activities);
    } catch (err) {
        console.error("Error fetching activities:", err.message);
        res.status(500).json({ error: "Failed to fetch activities" });
  }
}

export const updateActivity = async (req, res) => {
    try{
        const { id } = req.params;
        const userId = req.user.userId;
        const updates = req.body;

        //db logic
        const updated = await updateActivityDB(id, userId, updates);

        if (!updated) {
            return res.status(404).json({ error: "Activity not found"})
        }

        res.status(201).json({ activity: updated });
    } catch (error) {
        console.error("Error updating activity:", error);
        res.status(500).json({ error: "Server error while updating activity" })
    }
}

export const deleteActivity = async (req, res) => {
    const { id } = req.params;

    try{
        await deleteActivityFromDB(id);
        res.json({message: "Activity deleted successfully"});
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ error: "Failed to delete activity" });
    }
}