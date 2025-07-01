import poolPromise from "../DB/index.js";

// Fetch room facilities
const getRoomFacilities = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "SELECT DISTINCT facilities FROM rooms WHERE facilities IS NOT NULL"
      );

    const facilities = result.recordset.map((row) => row.facilities);
    res.status(200).json({ facilities });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch room facilities", details: err.message });
  }
};

const getRoomTypes = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "SELECT DISTINCT room_type FROM rooms WHERE room_type IS NOT NULL"
      );
    console.log(result);
    const roomTypes = result.recordset.map((row) => row.room_type);
    res.status(200).json({ roomTypes });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch room types", details: error.message });
  }
};

const getAvailableRooms = async (req, res) => {
  try {
    const { from_date, to_date, room_type } = req.body;
    const pool = await poolPromise;
    const result = await pool.request().query(`
            SELECT r.room_number, r.room_type, r.status,r.facilities
            FROM rooms r
            WHERE r.room_type = '${room_type}'
            AND r.id NOT IN (
                SELECT b.room_id
                FROM bookings b
                WHERE (b.from_date <= '${to_date}' AND b.to_date >= '${from_date}' )
            )
        `);
    const availablerooms = result.recordset;
    res.status(200).json({ availablerooms });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch available rooms",
      details: error.message,
    });
  }
};

const createRoom = async (req, res) => {
  try {
    const { room_type, room_number, status, facilities } = req.body;
    if (!room_type || !room_number || !status || !facilities) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const pool = await poolPromise;
    const response = await pool.request()
      .query(`INSERT INTO rooms (room_type, room_number, status, facilities)
VALUES ('${room_type}','${room_number}','${status}','${facilities}')`);

    if (response.rowsAffected[0] > 0) {
      res.status(200).json({ message: "Room created succesfully..." });
    } else {
      return res.status(500).json({ message: "Room creation failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "There is something error while creating the room ",
        error: error.message,
      });
  }
};

// Export the controller function
export { getRoomFacilities, getRoomTypes, getAvailableRooms,createRoom };
