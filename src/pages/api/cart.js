import { connectToDatabase } from "@/utils/mongodb";
import { authenticateToken } from "@/utils/auth";

export default async function handler(req, res) {
  authenticateToken(req, res, async () => {
    const { userId } = req;
    const { db } = await connectToDatabase();

    if (req.method === "GET") {
      const cart = await db.collection("carts").findOne({ userId });
      return res.status(200).json(cart?.items || []);
    }

    if (req.method === "POST") {
      const { item, remove } = req.body;
      const cart = await db.collection("carts").findOne({ userId });

      if (cart && cart.items) {
        let itemArray = cart.items;

        if (remove) {
          // Remove item from cart
          itemArray = itemArray.filter((cartItem) => cartItem.id !== item.id);
        } else {
          // Add or update item in cart
          let present = false;
          itemArray = itemArray.map((cartItem) => {
            if (cartItem.id === item.id) {
              cartItem.quantity = item.quantity;
              present = true;
            }
            return cartItem;
          });
          if (!present) {
            itemArray.push(item);
          }
        }

        await db
          .collection("carts")
          .findOneAndUpdate(
            { userId },
            { $set: { items: itemArray } },
            { upsert: true, returnDocument: "after" }
          );
      } else {
        if (!remove) {
          await db.collection("carts").insertOne({
            items: [item],
            userId,
          });
        }
      }

      const updatedCart = await db.collection("carts").findOne({ userId });
      return res.status(200).json(updatedCart?.items || []);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  });
}
