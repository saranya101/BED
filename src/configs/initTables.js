// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");


// ##############################################################
// DEFINE SQL STATEMENTS
// ##############################################################

const SQLSTATEMENT = `

  CREATE TABLE Quest (
    quest_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    points_awarded INT,
    magic_group_required TEXT
  );

  INSERT INTO Quest (title, description, points_awarded, magic_group_required)
  VALUES
  ('Master of Elements', 'Prove your mastery over the elements by casting spells from each elemental group.', 90, 'Fire, Ice, Electric, Earth'),
  ('Mind Over Matter', 'Demonstrate your psychic abilities by completing tasks that require psychic spells.', 85, 'Psychic'),
  ('Aerial Acrobat', 'Show your prowess in the air by completing tasks that require air-related spells.', 80, 'Air'),
  ('Shadow Walker', 'Navigate the shadows and complete stealthy missions that require dark spells.', 90, 'Dark'),
  ('Flame Guardian', 'Protect the realm using powerful fire spells.', 80, 'Fire'),
  ('Frostbite Challenge', 'Survive the frozen tundra using ice spells to overcome obstacles.', 75, 'Ice'),
  ('Shockwave Trial', 'Harness the power of electricity to overcome challenges and enemies.', 90, 'Electric'),
  ('Earthquake Resilience', 'Test your strength and stability against tremors using earth spells.', 95, 'Earth'),
  ('Mental Maze', 'Navigate through a labyrinth of the mind using psychic spells to unlock hidden secrets.', 85, 'Psychic'),
  ('Windswept Heights', 'Ascend to new heights using air spells to propel yourself upward.', 85, 'Air'),
  ('Shadow Stalker', 'Blend into the darkness and complete missions undetected using dark spells.', 95, 'Dark'),
  ('Green Guardian', 'Defend the forest and its inhabitants with spells that harness the power of nature.', 100, 'Nature'),
  ('Time Warp Challenge', 'Manipulate time to solve puzzles and overcome obstacles in this temporal trial.', 90, 'Temporal'),
  ('Elemental Convergence', 'Combine spells from different elemental groups to unleash devastating power.', 95, 'Fire, Ice, Electric, Earth'),
  ('Psionic Mastery', 'Unlock the full potential of your mind by mastering a variety of psychic spells.', 85, 'Psychic'),
  ('Aerial Duel', 'Engage in high-flying combat using air spells to outmaneuver your opponents.', 80, 'Air'),
  ('Nightshade Ninja', 'Become one with the shadows and strike from the darkness using dark spells.', 95, 'Dark'),
  ('Temporal Triumph', 'Navigate through time loops and paradoxes to save a doomed civilization using temporal spells to rewrite history.', 90, 'Temporal'),
  ('Phoenix Rebirth', 'Summon the legendary phoenix using fire spells to rise from the ashes and reignite hope in a desolate land.', 90, 'Fire'),
  ('Arctic Odyssey', 'Embark on an epic journey across the frozen tundra using ice spells to carve a path through glaciers and icebergs.', 90, 'Ice'),
  ('Electrokinetic Escapade', 'Escape from a high-security prison using electric spells to short-circuit security systems and power electronic locks.', 85, 'Electric'),
  ('Earthen Enigma', 'Solve the riddles of an ancient civilization buried beneath the earth using earth spells to uncover hidden chambers and decipher ancient scripts.', 95, 'Earth'),
  ('Psychic Pinnacle', 'Ascend to the peak of a mystical mountain and unlock psychic powers hidden within the mind.', 85, 'Psychic'),
  ('Aerial Assault', 'Engage in aerial combat against dragon riders using air spells to outmaneuver and outgun your opponents.', 80, 'Air'),
  ('Shadowed Sanctuary', 'Seek refuge in a hidden sanctuary shrouded in darkness using dark spells to evade pursuers and conceal your location.', 95, 'Dark');


CREATE TABLE IF NOT EXISTS Wizard (
  wizard_id INT PRIMARY KEY AUTO_INCREMENT,
  wizard_name TEXT,
  special_ability TEXT,
  magic_group TEXT
);

INSERT INTO Wizard (wizard_name, special_ability, magic_group)
VALUES
('Gandalf', 'Pyrotechnic Wizardry: Manipulating flames with finesse', 'Fire'),
('Gedron', 'Lightning Whisperer: Controlling electricity with precision', 'Electric'),
('Luna', 'Frost Weaver: Crafting intricate ice sculptures with magic', 'Ice'),
('Rand', 'Dimension Hopper: Teleporting across vast distances in an instant', 'Teleportation'),
('Nyx', 'Shadow Shifter: Merging seamlessly with the darkness', 'Shadow'),
('Morpheus', 'Mind Bender: Delving into the depths of consciousness', 'Psychic'),
('Magneto', 'Magnetic Maestro: Mastering the pull of unseen forces', 'Magnetic'),
('Saruman', 'Earthen Enchanter: Sculpting landscapes with earth magic', 'Earth'),
('Nimue', 'Time Weaver: Twisting the threads of time to her will', 'Temporal'),
('Dumbledore', 'Astral Voyager: Exploring distant realms beyond the physical', 'Teleportation'),
('Albus', 'Arcane Architect: Building wonders with the power of magic', 'Arcane'),
('Galadriel', 'Etheric Emissary: Communicating with spirits from other realms', 'Teleportation'),
('Obi-Wan', 'Force Sage: Harnessing the mystical energy of the Force', 'Teleportation'),
('Morgana', 'Illusionist Extraordinaire: Creating lifelike phantasms at will', 'Illusions'),
('Morgause', 'Dream Walker: Wandering through the realms of dreams', 'Illusions'),
('Circe', 'Enchantress of Elements: Bending fire, water, earth, and air to her will', 'Elemental'),
('Mab', 'Fey Whisperer: Commanding the mystical creatures of the faerie realm', 'Nature'),
('Geddy', 'Mirror Mage: Manipulating reflections to deceive and disorient', 'Illusions'),
('Cirrus', 'Cloud Conjurer: Sculpting clouds into fantastical shapes', 'Air'),
('Merlin', 'Chronomancer: Navigating the currents of time with ease', 'Temporal'),
('Elminster', 'Arcane Archmage: Wielding the raw power of magic in its purest form', 'Arcane'),
('Rincewind', 'Chaos Channeler: Embracing the unpredictable nature of magic', 'Arcane'),
('Gollum', 'Shadow Stalker: Becoming one with the darkness to move unseen', 'Shadow'),
('Voldemort', 'Dark Lord: Commanding the darkest spells with malevolent intent', 'Dark'),
('Sylvanus', 'Green Guardian: Preserving the balance of nature with ancient magic', 'Nature'),
('Plant Control', 'Botanical Bender: Manipulating plant life to serve his will', 'Nature'),
('Floral Growth', 'Blossom Conjurer: Bringing forth life with a touch of magic', 'Nature'),
('Medivh', 'Arcane Oracle: Peering into the depths of the arcane for hidden knowledge', 'Arcane'),
('Jaina', 'Frostborn Sorceress: Embracing the chill of winter in her magic', 'Ice'),
('Sheogorath', 'Mad God: Spinning chaos into reality with a touch of madness', 'Madness'),
('Hal9000', 'Digital Dynamo: Manipulating data streams with digital dexterity', 'Technological'),
('Glenlivet', 'Whiskey Warlock: Brewing potions with a dash of liquid magic', 'Alchemy'),
('Cthulhu', 'Eldritch Entity: Manifesting horrors from the depths of the void', 'Eldritch'),
('Scully', 'Spectral Sleuth: Investigating paranormal phenomena with scientific scrutiny', 'Paranormal'),
('Dobby', 'Household Hexer: Ensuring domestic harmony with a sprinkle of magic', 'Domestic'),
('Eowyn', 'Blade Enchantress: Empowering weapons with ancient enchantments', 'Combat'),
('Galactus', 'Cosmic Conqueror: Devouring worlds with the hunger of the cosmos', 'Cosmic'),
('Aragorn', 'Strategic Sorcerer: Turning the tide of battle with tactical magic', 'Tactical'),
('Tyrion', 'Wise Warlock: Outsmarting foes with cunning and guile', 'Tactical'),
('Frodo', 'Ring Bearer: Bearing the burden of the One Ring with unyielding resolve', 'Ring'),
('Katniss', 'Arrow Adept: Hitting her mark with deadly precision and skill', 'Combat'),
('Samus', 'Power Suit Savant: Unleashing the full potential of her armored exoskeleton', 'Technological'),
('Buffy', 'Vampire Vanquisher: Slaying the undead with righteous fury and magical prowess', 'Combat'),
('Bilbo', 'Riddle Resolver: Outwitting adversaries with clever wordplay and cunning', 'Intellectual');




-- Creating the Task table
CREATE TABLE Task (
  task_id INT PRIMARY KEY AUTO_INCREMENT,
  title TEXT,
  description TEXT,
  points INT
);


INSERT INTO Task (title, description, points)
VALUES
('Plant a Tree', 'Plant a tree in your neighborhood or a designated green area.', 100),
('Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 50),
('Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 60),
('Energy Conservation', 'Turn off lights and appliances when not in use.', 75),
('Composting', 'Start composting kitchen scraps to create natural fertilizer.', 85),
('Volunteer at Local Shelter', 'Spend a day volunteering at a local homeless shelter or animal rescue center.', 90),
('Donate Blood', 'Donate blood at a nearby blood donation center to help save lives.', 95),
('Clean Up Beaches', 'Participate in a beach cleanup event to remove trash and debris from the shorelines.', 85),
('Organize Recycling Drive', 'Organize a recycling drive in your community to collect recyclable materials.', 80),
('Community Garden', 'Join or start a community garden to grow fresh produce for local residents.', 90),
('Educational Workshops', 'Attend or organize educational workshops on environmental conservation and sustainability.', 75),
('Eco-Friendly Cooking Class', 'Take a cooking class focused on preparing meals with sustainable and locally sourced ingredients.', 85),
('Zero Waste Challenge', 'Take on a zero waste challenge for a week, minimizing waste and maximizing recycling and composting.', 95),
('Green Energy Advocacy', 'Get involved in advocating for green energy policies and initiatives in your local government.', 90),
('Nature Hike', 'Go on a nature hike and explore the beauty of the outdoors while learning about local ecosystems.', 80),
('Environmental Documentary Night', 'Host a movie night featuring documentaries about environmental issues and solutions.', 70),
('Bird Watching', 'Go bird watching in a local park or nature reserve to observe and learn about bird species in your area.', 85),
('Sustainable Fashion Workshop', 'Attend a workshop on sustainable fashion and learn about eco-friendly clothing options.', 75),
('Community Cleanup Day', 'Participate in a community cleanup day to beautify public spaces and remove litter.', 85),
('Green Roof Installation', 'Volunteer to help install green roofs on buildings to promote energy efficiency and urban biodiversity.', 95),
('Rainwater Harvesting System', 'Install a rainwater harvesting system at home to collect and reuse rainwater for watering plants and gardens.', 90),
('Public Park Renovation', 'Volunteer to help renovate and beautify a public park by planting trees, flowers, and shrubs.', 85),
('Environmental Art Project', 'Collaborate on an environmental art project using recycled materials to raise awareness about conservation.', 80),
('Local Farmers Market', 'Support local farmers and artisans by shopping at a nearby farmers market for fresh produce and handmade goods.', 85),
('Green Transportation Challenge', 'Take on a green transportation challenge by walking, biking, or using public transportation for a week instead of driving.', 90),
('Urban Tree Planting Initiative', 'Participate in an urban tree planting initiative to increase green spaces and improve air quality in cities.', 95),
('River Cleanup Expedition', 'Join a river cleanup expedition to remove debris and pollutants from waterways and promote river conservation.', 85),
('Environmental Book Club', 'Start or join an environmental book club to discuss literature on sustainability and conservation issues.', 75),
('Community Bicycle Repair Workshop', 'Organize a community bicycle repair workshop to teach basic bike maintenance and promote cycling as a sustainable transportation option.', 80),
('Wildlife Habitat Restoration', 'Volunteer to help restore wildlife habitats by planting native vegetation and removing invasive species.', 90),
('Green Building Tour', 'Take a tour of green buildings in your city to learn about sustainable architecture and energy-efficient design principles.', 85),
('Zero Waste Lifestyle Seminar', 'Attend a seminar on adopting a zero waste lifestyle and learn practical tips for reducing waste in daily life.', 95),
('Solar Panel Installation Project', 'Volunteer to assist with the installation of solar panels on rooftops to promote renewable energy use.', 90),
('Community Orchard Planting', 'Participate in planting fruit trees in a community orchard to provide fresh fruit for local residents.', 85),
('Environmental Science Fair', 'Organize or participate in an environmental science fair to showcase student projects on sustainability and environmental conservation.', 80);




CREATE TABLE IF NOT EXISTS Spell (
  spell_id INT PRIMARY KEY AUTO_INCREMENT,
  name TEXT,
  description TEXT,
  points_cost INT,
  magic_group TEXT
);

INSERT INTO Spell (name, description, points_cost, magic_group)
VALUES
('Fireball', 'Launch a fiery projectile at the target.', 50, 'Fire'),
('Invisibility', 'Become invisible for a short duration.', 30, 'Stealth'),
('Teleportation', 'Instantly move to a different location.', 40, 'Transportation'),
('Ice Shield', 'Create a protective barrier made of ice to deflect attacks.', 45, 'Ice'),
('Mind Control', 'Manipulate the thoughts and actions of others.', 55, 'Psychic'),
('Time Manipulation', 'Control and alter the flow of time.', 60, 'Temporal'),
('Telekinesis', 'Move objects with the power of the mind.', 35, 'Psychic'),
('Healing Touch', 'Restore health and vitality with a simple touch.', 25, 'Healing'),
('Electrokinesis', 'Generate and control electricity at will.', 50, 'Electric'),
('Shape-shifting', 'Transform into different animals or people.', 40, 'Morph'),
('Gravity Manipulation', 'Control the gravitational forces in the environment.', 55, 'Gravity'),
('Mind Reading', 'Read the thoughts and emotions of others.', 30, 'Psychic'),
('Flight', 'Gain the ability to fly at incredible speeds.', 40, 'Air'),
('Shadow Manipulation', 'Blend into and control shadows for stealth and offense.', 35, 'Dark'),
('Earthquake Generation', 'Create powerful earthquakes to shake the ground.', 65, 'Earth'),
('Energy Absorption', 'Absorb and channel various forms of energy.', 45, 'Energy'),
('Bioluminescence', 'Generate light from the body for illumination.', 20, 'Light'),
('Force Field', 'Create an impenetrable barrier for protection.', 50, 'Force'),
('Acid Spit', 'Project corrosive acid from the mouth.', 30, 'Acid'),
('Clairvoyance', 'Perceive events or information beyond normal senses.', 40, 'Psychic'),
('Sonic Blast', 'Release powerful sonic waves to disorient foes.', 35, 'Sound'),
('Magnetism Manipulation', 'Control and manipulate magnetic fields.', 55, 'Magnetic'),
('Plant Control', 'Control and manipulate plant life.', 30, 'Nature'),
('Pyrokinetic Flight', 'Fly using controlled bursts of fire.', 60, 'Fire'),
('Duplication', 'Create duplicates of oneself for various tasks.', 45, 'Clone'),
('Density Manipulation', 'Adjust personal density for increased strength or intangibility.', 50, 'Density'),
('Hypnosis', 'Induce a trance-like state in others for suggestion.', 35, 'Psychic');



CREATE TABLE IF NOT EXISTS User (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  total_points INT DEFAULT 0,
  wizard_id INT,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (wizard_id) REFERENCES Wizard(wizard_id) ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS Admin (
  admin_id INT PRIMARY KEY AUTO_INCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




-- Creating the TaskProgress table
CREATE TABLE TaskProgress (
  progress_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL ,
  task_id INT NOT NULL,
  completion_date,
  notes TEXT
);

CREATE TABLE SpellOwnership (
  ownership_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  spell_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  FOREIGN KEY (spell_id) REFERENCES Spell(spell_id)
);

  
CREATE TABLE IF NOT EXISTS Messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  message_text TEXT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
);


  


  
  CREATE TABLE UserQuestProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    quest_id INT,
    completed BOOLEAN DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (quest_id) REFERENCES Quest(quest_id)
  );

`;

// ##############################################################
// RUN SQL STATEMENTS
// ##############################################################
pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
});
