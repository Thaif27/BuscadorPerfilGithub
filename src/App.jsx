import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const searchProfile = async () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setError("Digite um nome de usuário válido.");
      setProfile(null);
      return;
    }

    setIsFetching(true);
    setError("");
    setProfile(null);

    try {
      const response = await fetch(`https://api.github.com/users/${trimmedUsername}`);
      if (!response.ok) throw new Error("Usuário não encontrado");
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError("Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isFetching) {
      e.preventDefault();
      searchProfile();
    }
  };

  return (
    <div className="container">
      <h1>
        <img src="./githubicone.png" alt="GitHub" className="github-icon" />
        <span>Perfil <strong>GitHub</strong></span>
      </h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="thaif27"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={searchProfile} disabled={isFetching}>
          <img src="/serachicone.png" alt="Buscar" />
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {profile && (
        <div className="profile-card">
          <img src={profile.avatar_url} alt="Avatar" className="profile-image" />
          <div className="profile-info">
            <h2>{profile.name || "Sem nome"}</h2>
            <p>{profile.bio || "Sem bio"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
