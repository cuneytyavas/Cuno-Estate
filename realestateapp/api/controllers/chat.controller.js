import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

      const receiver = await prisma.user.findUnique({
        where: { id: receiverId },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.findUniqueOrThrow({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const receiverId = req.body.recieverId;

  try {
    const existingChat = await prisma.chat.findFirst({
      where: {
        AND: [
          { users: { some: { id: tokenUserId } } },
          { users: { some: { id: receiverId } } },
        ],
      },
    });

    if (existingChat) {
      return res.status(200).json({ message: "Chat already exists." });
    }

    const newChat = await prisma.chat.create({
      data: {
        users: {
          connect: [{ id: tokenUserId }, { id: receiverId }],
        },
      },
    });

    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
      select: {
        id: true,
        username: true,
        avatar: true,
      },
    });
    newChat.receiver = receiver;

    return res.status(200).json(newChat);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to create chat." });
  }
};
export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to read Chat!" });
  }
};
