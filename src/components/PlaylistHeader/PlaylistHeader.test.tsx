import React from "react";
import { render, screen } from "@testing-library/react";
import { PlaylistHeader } from "./PlaylistHeader"; // Adjust path as needed

describe("PlaylistHeader", () => {
  const mockPlaylist = {
    name: "Deep House",
    artist: "Various Artists",
    year: 2022,
    tracks: [{ name: "Track 1", url: "track1.mp3", duration: 180 }],
  };

  const mockTrack = mockPlaylist.tracks[0];

  it("renders correctly with playlist and track info", () => {
    render(<PlaylistHeader currentPlaylist={mockPlaylist} currentTrack={mockTrack} />);

    // Check if playlist name is rendered
    expect(screen.getByText("Deep House")).toBeInTheDocument();

    // Check if artist and year are displayed
    expect(screen.getByText("Various Artists - 2022")).toBeInTheDocument();

    // Check if the currently playing track is displayed
    expect(screen.getByText("Now Playing: Track 1")).toBeInTheDocument();
  });

  it("handles missing artist and year gracefully", () => {
    const mockPlaylistWithoutArtist = {
      name: "No Artist Playlist",
      tracks: [{ name: "Track 1", url: "track1.mp3", duration: 180 }],
    };

    render(<PlaylistHeader currentPlaylist={mockPlaylistWithoutArtist} currentTrack={mockTrack} />);

    // Playlist name should be displayed
    expect(screen.getByText("No Artist Playlist")).toBeInTheDocument();

    // Artist info should not be displayed
    expect(screen.queryByText("- 2022")).not.toBeInTheDocument();

    // "Now Playing" should still be displayed
    expect(screen.getByText("Now Playing: Track 1")).toBeInTheDocument();
  });
});
