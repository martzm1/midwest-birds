import React, { useState, useEffect } from "react";
import "./App.css";

type Bird = {
  name: string;
  image: string;
  audio: string;
  fact: string;
};

type Question = {
  bird: Bird;
  choices: Bird[];
};

const birds: Bird[] = [
  {
    name: "Northern Cardinal",
    image: "https://biodiversity.utexas.edu/sites/default/files/uploads/images/default/cardinal-header.jpg",
    audio: "/sounds/northern_cardinal.mp3",
    fact: "Male cardinals are bright red, while females are mostly brown with red tinges."
  },
  {
    name: "Blue Jay",
    image: "https://media.audubon.org/nas_birdapi_hero/sfw_fixed_01-29-2011-223.jpg?height=944&auto=webp&quality=90&fit=bounds&disable=upscale",
    audio: "/sounds/blue_jay.mp3",
    fact: "Blue Jays can mimic hawk calls to scare other birds."
  },
  {
    name: "American Robin",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Turdus-migratorius-002.jpg",
    audio: "/sounds/american_robin.mp3",
    fact: "Robins are one of the earliest birds to start singing at dawn."
  },
  {
    name: "Mourning Dove",
    image: "https://www.ndow.org/wp-content/uploads/2021/10/zenaida_macroura.jpeg",
    audio: "/sounds/mourning_dove.mp3",
    fact: "Their soft cooing gives them their name; they can reach speeds of up to 55 mph in flight."
  },
  {
    name: "Song Sparrow",
    image: "https://www.allaboutbirds.org/guide/assets/photo/308771371-480px.jpg",
    audio: "/sounds/song_sparrow.mp3",
    fact: "Song Sparrows have complex songs and each male has a unique variation."
  },
  {
    name: "Red-winged Blackbird",
    image: "https://www.chesapeakebay.net/files/critters/_700x600_fit_center-center_none/Photo-82060448-c-cnaturejoy-some-rights-reserved-CC-BY-NC.jpg",
    audio: "/sounds/red_winged_blackbird.mp3",
    fact: "Males are easy to spot with bright red shoulder patches."
  },
  {
    name: "House Finch",
    image: "https://preview.redd.it/beautiful-house-finch-in-dayton-ohio-v0-ouy8bl7o39cd1.jpeg?auto=webp&s=de5d2146a0ab2afe4aeafd50ec132c0a2d4792a2",
    audio: "/sounds/house_finch.mp3",
    fact: "Males have red plumage; they are common at backyard feeders."
  },
  {
    name: "Dark-eyed Junco",
    image: "https://vt.audubon.org/sites/default/files/styles/hero_image/public/apa-2017_dark-eyed-junco_a1_3764_2_jocelyn-anderson_kk.jpg?itok=xTF8AiwD",
    audio: "/sounds/dark_eyed_junco.mp3",
    fact: "Often called 'snowbirds' because they are commonly seen in winter."
  },
  {
    name: "Downy Woodpecker",
    image: "https://veseris.com/media/wysiwyg/birds_downy_woodpecker_1.png",
    audio: "/sounds/downy_woodpecker.mp3",
    fact: "Smallest North American woodpecker; they drum on trees for communication."
  },
  {
    name: "Hairy Woodpecker",
    image: "https://climate2014.audubon.org/sites/default/files/styles/focal_bird_engagement/public/bird_images/Hairy_Woodpecker_EricBegin_FlickrCC_1.jpg?itok=5xTceCnF",
    audio: "/sounds/hairy_woodpecker.mp3",
    fact: "Looks like a bigger Downy Woodpecker; has a longer bill for drilling."
  },
  {
    name: "American Goldfinch",
    image: "https://www.backyardecology.net/wp-content/uploads/2023/08/American-goldfinch-2_Shenandoah-National-Park.jpg",
    audio: "/sounds/american_goldfinch.mp3",
    fact: "Bright yellow in summer; they feed mainly on seeds and are late nesters."
  },
  {
    name: "Eastern Towhee",
    image: "https://abcbirds.org/wp-content/uploads/2025/03/BOTW-featured-image_Eastern-Towhee_Brad-Imhoff-Macaulay-Library-at-the-Cornell-Lab-of-Ornithology-1024x683.webp",
    audio: "/sounds/eastern_towhee.mp3",
    fact: "Known for its 'drink-your-tea!' song; males have black upper parts, females brown."
  },
  {
    name: "Chipping Sparrow",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Spizella-passerina-015_edit.jpg",
    audio: "/sounds/chipping_sparrow.mp3",
    fact: "Bright rufous cap in summer; very common in suburban areas."
  },
  {
    name: "White-breasted Nuthatch",
    image: "https://wildlifeleadershipacademy.org/wp-content/uploads/2015/08/Feature-Image-Sizing-1.jpg",
    audio: "/sounds/white_breasted_nuthatch.mp3",
    fact: "Crawls down trees head-first; they wedge seeds into bark to eat."
  },
  {
    name: "Tufted Titmouse",
    image: "https://images.squarespace-cdn.com/content/v1/60750489d6588c09f1001893/b7de672a-a118-4bfe-a8d7-f5118c55ce83/Tufted-Titmouse_Dave-Boltz+2.jpg",
    audio: "/sounds/tufted_titmouse.mp3",
    fact: "Gray with a tufted crest; they are very social and often visit feeders."
  },
  {
    name: "Eastern Bluebird",
    image: "https://www.natureswaybirds.com/cdn/shop/articles/eastern_bluebird.png?v=1713204293",
    audio: "/sounds/eastern_bluebird.mp3",
    fact: "Bright blue plumage; cavity nester often using birdhouses."
  },
  {
    name: "Carolina Wren",
    image: "https://www.allaboutbirds.org/guide/assets/photo/304470861-480px.jpg",
    audio: "/sounds/carolina_wren.mp3",
    fact: "Tiny brown bird with a loud, musical song."
  },
  {
    name: "Northern Mockingbird",
    image: "https://www.birdsandblooms.com/wp-content/uploads/2022/12/251837697_1_Helen_Fojtik_BNB_BYPC2020.jpg",
    audio: "/sounds/northern_mockingbird.mp3",
    fact: "Can mimic the songs of over 20 other birds and sounds."
  },
  {
    name: "Cedar Waxwing",
    image: "https://www.birdsandblooms.com/wp-content/uploads/2022/10/GettyImages-1136115716.jpg?fit=680%2C510",
    audio: "/sounds/cedar_waxwing.mp3",
    fact: "Smooth, sleek bird with a black mask and red wax-like wing tips."
  },
  {
    name: "American Crow",
    image: "https://www.allaboutbirds.org/guide/assets/photo/59858041-480px.jpg",
    audio: "/sounds/american_crow.mp3",
    fact: "Highly intelligent and social; often seen in large groups."
  },
  {
    name: "Common Grackle",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkwYubsxDXpJAnYIyESMzK8PMxpHKv1k4N4g&s",
    audio: "/sounds/common_grackle.mp3",
    fact: "Glossy black bird with iridescent head; they often gather in huge flocks."
  },
  {
    name: "Baltimore Oriole",
    image: "https://cdn.download.ams.birds.cornell.edu/api/v2/asset/193192701/1200",
    audio: "/sounds/baltimore_oriole.mp3",
    fact: "Bright orange and black; known for hanging woven basket-like nests."
  },
  {
    name: "Yellow-bellied Sapsucker",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKjN0xV4rVX29NJXbrxwOBdBMZVQP0agrtA&s",
    audio: "/sounds/yellow_bellied_sapsucker.mp3",
    fact: "Drills neat rows of holes in trees to feed on sap and insects."
  },
  {
    name: "Eastern Kingbird",
    image: "https://www.allaboutbirds.org/guide/assets/og/75342041-1200px.jpg",
    audio: "/sounds/eastern_kingbird.mp3",
    fact: "Aggressive flycatcher that will chase much larger birds away from its territory."
  },
  {
    name: "Pileated Woodpecker",
    image: "https://cdn.download.ams.birds.cornell.edu/api/v2/asset/617520228/900",
    audio: "/sounds/pileated_woodpecker.mp3",
    fact: "One of the largest woodpeckers; creates large rectangular holes in trees."
  },
];

function App() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answered, setAnswered] = useState(false);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bgColor, setBgColor] = useState("white");
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [scorePop, setScorePop] = useState(false);

  // Generate new question
  const generateQuestion = () => {
    setBgColor("white");
    setAnswered(false);
    setMessage("");

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }

    // Pick random bird
    const randomBird = birds[Math.floor(Math.random() * birds.length)];

    // Pick 3 random wrong birds
    const wrong = birds
      .filter(b => b.name !== randomBird.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allChoices = [...wrong, randomBird]
      .sort(() => Math.random() - 0.5);

    setQuestion({
      bird: randomBird,
      choices: allChoices
    });
  };

  // Run once on load
  useEffect(() => {
    generateQuestion();
  }, []);
  
  useEffect(() => {
  if (scorePop) {
    const timer = setTimeout(() => setScorePop(false), 700);
    return () => clearTimeout(timer);
  }
}, [scorePop]);

  const checkAnswer = (selected: Bird) => {
  if (!question) return;

  if (selected.name === question.bird.name) {
    setMessage("✅ Correct!");
    setScore(prev => prev + 1);
    setStreak(prev => prev + 1);
    setBgColor("#6ee472");

    setScorePop(true);   // 👈 ADD THIS
  } else {
    setMessage(`❌ Wrong! It was ${question.bird.name}`);
    setStreak(0);
    setBgColor("#fc5246");
  }

  setAnswered(true);
};

  const playSound = () => {
    if (!question) return;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    const newAudio = new Audio(question.bird.audio);
    setAudio(newAudio);
    newAudio.play();
  };

  if (!question) return null;

  return (
    <div
      className="App"
      style={{
        textAlign: "center",
        padding: 20,
        backgroundColor: bgColor,
        transition: "background-color 0.4s ease"
      }}
    >
      <h1>:3 Midwest Bird Quiz :3</h1>
      <div style={{ position: "relative", display: "inline-block" }}>
  <h2>Score: {score}</h2>

  {scorePop && (
    <span
      style={{
        position: "absolute",
        top: -20,
        right: -15,
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffd700",
        animation: "scorePop 0.7s ease-out forwards"
      }}
    >
      +1
    </span>
  )}
</div>
      <h3>🔥 Streak: {streak}</h3>

      <button onClick={playSound}>Play Bird Call</button>

      <div style={{ marginTop: 20 }}>
        {question.choices.map(choice => (
          <button
            key={choice.name}
            onClick={() => checkAnswer(choice)}
            disabled={answered}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "90%",
              margin: "10px auto",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #333",
              fontSize: 16,
              backgroundColor: answered
                ? choice.name === question.bird.name
                  ? "#a4e2a6"
                  : "#faa6a0"
                : "#2196f3",
              color: "white",
              cursor: answered ? "default" : "pointer"
            }}
          >
            <img
              src={choice.image}
              alt={choice.name}
              style={{
                width: 50,
                height: 50,
                borderRadius: 8,
                objectFit: "cover"
              }}
            />
            {choice.name}
          </button>
        ))}
      </div>

      {answered && (
        <>
          <h3>{message}</h3>

          <div style={{ marginTop: 15 }}>
            <img
              src={question.bird.image}
              alt={question.bird.name}
              style={{ width: 250, borderRadius: 12 }}
            />
            <p style={{ fontStyle: "italic" }}>
              📝 {question.bird.fact}
            </p>
          </div>

          <button
            onClick={generateQuestion}
            style={{ marginTop: 15 }}
          >
            Next Question
          </button>
        </>
      )}
    </div>
  );
}

export default App;