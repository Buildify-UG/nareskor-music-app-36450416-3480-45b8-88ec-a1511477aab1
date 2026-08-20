import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Share2, Search, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Sample music data
const sampleTracks = [
  {
    id: 1,
    title: 'Midnight Dreams',
    artist: 'Luna Echo',
    duration: '3:45',
    plays: 2.4,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    liked: false,
  },
  {
    id: 2,
    title: 'Neon Nights',
    artist: 'Synthwave Collective',
    duration: '4:12',
    plays: 1.8,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    liked: true,
  },
  {
    id: 3,
    title: 'Golden Hour',
    artist: 'Acoustic Vibes',
    duration: '3:28',
    plays: 3.1,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
    liked: false,
  },
  {
    id: 4,
    title: 'Electric Pulse',
    artist: 'Digital Horizon',
    duration: '3:56',
    plays: 2.9,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop',
    liked: false,
  },
  {
    id: 5,
    title: 'Cosmic Journey',
    artist: 'Space Cadets',
    duration: '4:33',
    plays: 1.5,
    image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
    liked: true,
  },
  {
    id: 6,
    title: 'Urban Beats',
    artist: 'City Sounds',
    duration: '3:15',
    plays: 4.2,
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
    liked: false,
  },
];

const samplePlaylists = [
  { id: 1, name: 'Chill Vibes', tracks: 24, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop' },
  { id: 2, name: 'Workout Mix', tracks: 18, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop' },
  { id: 3, name: 'Study Focus', tracks: 32, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop' },
];

export default function Index() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(sampleTracks[0]);
  const [tracks, setTracks] = useState(sampleTracks);
  const [searchQuery, setSearchQuery] = useState('');
  const [volume, setVolume] = useState(70);

  const toggleLike = (id: number) => {
    setTracks(tracks.map(t => t.id === id ? { ...t, liked: !t.liked } : t));
  };

  const filteredTracks = tracks.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Nareskor</h1>
          </div>
          <div className="flex-1 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search songs, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-100 border-0 focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          </div>
          <Button variant="ghost" className="text-slate-600">Sign In</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Now Playing */}
        <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white mb-12 shadow-lg">
          <div className="flex gap-8 items-center">
            <div className="w-48 h-48 rounded-xl overflow-hidden shadow-2xl flex-shrink-0">
              <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold opacity-90 mb-2">NOW PLAYING</p>
              <h2 className="text-4xl font-bold mb-2">{currentTrack.title}</h2>
              <p className="text-lg opacity-90 mb-8">{currentTrack.artist}</p>
              
              {/* Player Controls */}
              <div className="flex items-center gap-6 mb-8">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  className="w-14 h-14 bg-white text-purple-600 hover:bg-white/90 rounded-full"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-white rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs opacity-75">
                  <span>1:15</span>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Playlists Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Your Playlists</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {samplePlaylists.map(playlist => (
              <div
                key={playlist.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="relative h-40 overflow-hidden bg-slate-200">
                  <img src={playlist.image} alt={playlist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Button size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500 hover:bg-blue-600 rounded-full">
                      <Play className="w-5 h-5 ml-0.5" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-slate-900">{playlist.name}</h4>
                  <p className="text-sm text-slate-500">{playlist.tracks} songs</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Tracks */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Trending Now</h3>
          <div className="space-y-3">
            {filteredTracks.map((track, idx) => (
              <div
                key={track.id}
                className="group bg-white rounded-lg p-4 hover:bg-slate-50 transition-colors flex items-center gap-4 cursor-pointer border border-slate-100"
              >
                <div className="text-lg font-bold text-slate-400 w-8">{idx + 1}</div>
                <img src={track.image} alt={track.title} className="w-14 h-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 truncate">{track.title}</h4>
                  <p className="text-sm text-slate-500 truncate">{track.artist}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-slate-900">{track.plays}M plays</p>
                  <p className="text-xs text-slate-500">{track.duration}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-slate-400 hover:text-slate-600"
                    onClick={() => toggleLike(track.id)}
                  >
                    <Heart className={`w-5 h-5 ${track.liked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => setCurrentTrack(track)}
                  >
                    <Play className="w-4 h-4 ml-0.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Volume Control (Bottom Right) */}
      <div className="fixed bottom-8 right-8 bg-white rounded-full p-4 shadow-lg flex items-center gap-3">
        <Volume2 className="w-5 h-5 text-slate-600" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24 h-1 bg-slate-200 rounded-full appearance-none cursor-pointer"
        />
        <span className="text-sm font-medium text-slate-600 w-8">{volume}%</span>
      </div>
    </div>
  );
}
