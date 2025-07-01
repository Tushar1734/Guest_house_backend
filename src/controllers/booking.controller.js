import poolPromise from "../DB/index.js";

const createBooking = async (req, res) => {
  try {
    const {
      room_id,
      from_date,
      to_date,
      is_member,
      memmbership_number,
      id_proof_url,
      payment_status,
    } = req.body;
    const user_id = req.user.id;
    const pool = await poolPromise;
    if (
      !room_id ||
      !from_date ||
      !to_date ||
      typeof is_member !== "boolean" ||
      !id_proof_url ||
      !payment_status
    ) {
      res.status(400).json({
        message:
          "All fields are required ,MemberShip Number is only required if you are a member",
      });
    }

    if (is_member && !memmbership_number) {
      return res
        .status(400)
        .json({ message: "Membership number is required for members" });
    }
    let result="";
    if (is_member) {
     result = await pool.request().query(`
                INSERT INTO bookings 
                (user_id, room_id, from_date, to_date, is_member, membership_number, id_proof_url, payment_status)
                VALUES 
                (${user_id}, ${room_id}, '${from_date}', '${to_date}', 1, '${memmbership_number}', '${id_proof_url}', '${payment_status}')
`);
    } else {
       result = await pool.request().query(`
                    INSERT INTO bookings 
                    (user_id, room_id, from_date, to_date, is_member, id_proof_url, payment_status)
                    VALUES 
                    (${user_id}, ${room_id}, '${from_date}', '${to_date}', 0, '${id_proof_url}', '${payment_status}' )`);
    }
    const response = await pool
      .request()
      .query(
        `SELECT * FROM bookings WHERE user_id = ${user_id} AND room_id = ${room_id} AND from_date = '${from_date}' AND to_date = '${to_date}'`
      );
    if (result.rowsAffected[0] > 0) {
      return res.status(201).json({
        message: "Booking created successfully",
        Details: response.recordset[0],
      });
    } else {
      result.status(500).json({ message: "Error in creating booking" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in creating booking plear try again later",
      error: error.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM bookings ORDER BY created_at DESC");
    if (result.recordset.length > 0) {
      return res.status(200).json({
        message: "Bookings fetched successfully",
        bookings: result.recordset,
      });
    } else {
      return res.status(404).json({ message: "No bookings found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching the bookings please try again later",
      error: error.message,
    });
  }
};

export { createBooking, getAllBookings };
