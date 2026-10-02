
export const LikeFunction = (song, navigate) => {
  console.log("Like clicked:", song);

  // Song hi nahi hai
  if (!song) {
    console.log("Song is null");
    return;
  }

  const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

  // Login check
  if (!currentUser) {
    navigate("/login");
    return;
  }

  // Null/invalid songs remove kar do
  const likedSongs = (currentUser.likedSongs || []).filter(
    (item) => item !== null && item !== undefined
  );

  // Check already liked
  const alreadyLiked = likedSongs.some(
    (item) => item.id === song.id
  );

  // Toggle like
  const updatedLikedSongs = alreadyLiked
    ? likedSongs.filter((item) => item.id !== song.id)
    : [...likedSongs, song];

  const updatedUser = {
    ...currentUser,
    likedSongs: updatedLikedSongs,
  };

  // Current user update
  localStorage.setItem(
    "currentUser",
    JSON.stringify(updatedUser)
  );

  // All users update
  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const updatedUsers = users.map((user) =>
    user.id === currentUser.id
      ? updatedUser
      : user
  );

  localStorage.setItem(
    "users",
    JSON.stringify(updatedUsers)
  );

  console.log(
    alreadyLiked
      ? "❤️ Song removed"
      : "❤️ Song added"
  );
};

