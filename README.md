# CR Knowledge Hub — Setup & Contribution Guide (Beginner-Friendly)

**CR Knowledge Hub** is a web app built with **React + TypeScript + Vite** (package manager: **npm** or **Bun**).  
This guide explains **from zero** how to install the tools, run the site locally, and add new content (topics + images). It’s written for **non-programmers** (teachers, managers, general professionals).

> You’ll copy a few commands into a **Terminal** window. Follow each step exactly. If something doesn’t work, see the **Troubleshooting** section.

---

## Table of Contents

1. [What You Will Install](#what-you-will-install)  
2. [System Requirements](#system-requirements)  
3. [Windows Setup](#windows-setup)  
4. [macOS Setup](#macos-setup)  
5. [Linux Setup (Ubuntu/Debian/Fedora)](#linux-setup-ubuntudebianfedora)  
6. [Open the Project in VS Code](#open-the-project-in-vs-code)  
7. [Install Project Dependencies](#install-project-dependencies)  
8. [Run the Project Locally](#run-the-project-locally)  
9. [Add a New Topic (JSON + Images)](#add-a-new-topic-json--images)  
   - [Topic JSON Template](#topic-json-template)  
   - [Where to Place Images](#where-to-place-images)  
   - [Preview and Test Locally](#preview-and-test-locally)  
10. [Propose Your Changes (Branch + Pull Request)](#propose-your-changes-branch--pull-request)  
11. [Build for Production (Optional)](#build-for-production-optional)  
12. [Recommended VS Code Extensions](#recommended-vs-code-extensions)  
13. [Troubleshooting](#troubleshooting)  
14. [FAQ](#faq)

---

## What You Will Install

- **VS Code** (code editor; use it like a normal app)
- **Git** (tool to download the repository and send changes)
- **Node.js** (required to run the project)
- **One package manager** (choose **npm** or **Bun**; if unsure, use **npm**)
- The project itself (**cr-knowledge-hub**)

> You will run commands in a **Terminal** (Windows PowerShell, macOS Terminal, or Linux Terminal). We show exactly what to do.

---

## System Requirements

- **Operating System:** Windows 10/11, macOS 12+, or a modern Linux distro (Ubuntu/Debian/Fedora)
- **Node.js:** v18 or newer (LTS recommended)
- **Browser:** Any modern browser (Edge, Chrome, Firefox)

---

## Windows Setup

1. **Install VS Code**
   - Download and install “Visual Studio Code” from the official website.
   - During install, accept defaults. (If you see “Add to PATH”, check it.)

2. **Install Git**
   - Download and install “Git for Windows”.
   - Accept defaults. This adds `git` to PowerShell and installs **Git Bash**.

3. **Install Node.js**
   - Download and install **Node.js LTS**.
   - Open **PowerShell** and verify:
     ```powershell
     node -v
     npm -v
     ```
     You should see version numbers (e.g., `v20.x` / `10.x`). If not, restart the PC and try again.

4. **(Optional) Install Bun**
   - Install Bun using the Windows installer from bun.sh (optional).
   - Verify:
     ```powershell
     bun -v
     ```

---

## macOS Setup

1. **Install VS Code**
   - Download the macOS build, drag **Visual Studio Code.app** into **Applications**.

2. **Install Git**
   - Open **Terminal** (Applications → Utilities → Terminal):
     ```bash
     git --version
     ```
     If a dialog offers to install Developer Tools, accept.
     - If you use **Homebrew**:
       ```bash
       /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
       brew install git
       ```

3. **Install Node.js**
   - With **Homebrew**:
     ```bash
     brew install node
     ```
   - Or download the macOS installer (Node.js LTS).
   - Verify:
     ```bash
     node -v
     npm -v
     ```

4. **(Optional) Install Bun**
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```
   Close and reopen Terminal, then:
   ```bash
   bun -v
   ```

---

## Linux Setup (Ubuntu/Debian/Fedora)

1. **Install VS Code**
   - **Ubuntu/Debian:**
     ```bash
     sudo apt update
     sudo apt install -y wget gpg apt-transport-https
     wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | sudo tee /usr/share/keyrings/vscode.gpg > /dev/null
     echo "deb [arch=amd64 signed-by=/usr/share/keyrings/vscode.gpg] https://packages.microsoft.com/repos/vscode stable main" | sudo tee /etc/apt/sources.list.d/vscode.list
     sudo apt update
     sudo apt install -y code
     ```
   - **Fedora:**
     ```bash
     sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
     sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
     sudo dnf check-update
     sudo dnf install -y code
     ```

2. **Install Git**
   - **Ubuntu/Debian:**
     ```bash
     sudo apt update
     sudo apt install -y git
     ```
   - **Fedora:**
     ```bash
     sudo dnf install -y git
     ```
   - Verify:
     ```bash
     git --version
     ```

3. **Install Node.js**
   - **Ubuntu/Debian (NodeSource LTS):**
     ```bash
     curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
     sudo apt install -y nodejs
     ```
   - **Fedora:**
     ```bash
     sudo dnf install -y nodejs
     ```
   - Verify:
     ```bash
     node -v
     npm -v
     ```

4. **(Optional) Install Bun**
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```
   Close and reopen Terminal, then:
   ```bash
   bun -v
   ```

---

## Open the Project in VS Code

1. **Download (clone) the repository**
   - Choose a folder (Desktop, Documents, etc.).
   - Open your **Terminal** and run:
     ```bash
     git clone https://github.com/LuisCastilloV98/cr-knowledge-hub.git
     ```
     Replace `LuisCastilloV98` with the correct GitHub owner.

2. **Enter the project folder**
   ```bash
   cd cr-knowledge-hub
   ```

3. **Open VS Code in this folder**
   - If `code` is available:
     ```bash
     code .
     ```
   - Or open VS Code, then **File → Open Folder…**, and select `cr-knowledge-hub`.

---

## Install Project Dependencies

> Choose **one** method. If unsure, use **npm**.

- **npm (recommended for beginners)**
  ```bash
  npm install
  ```

- **Bun**
  ```bash
  bun install
  ```

Wait until it finishes. If you see errors, check **Troubleshooting**.

---

## Run the Project Locally

Start the development server:

- **npm**
  ```bash
  npm run dev
  ```

- **Bun**
  ```bash
  bun run dev
  ```

**What you’ll see:**
- The terminal prints a local URL like `http://localhost:5173/`.
- Open that address in your browser; the site should appear.
- Keep the terminal **open**. To stop the server, press **Ctrl + C** in that terminal.

---

## Add a New Topic (JSON + Images)

You can add content **without programming** by creating a **JSON** file for the topic and placing its **images** in the public folder.

### Folder Conventions (Very Important)

- **Topic data (JSON):**
  ```
  src/data/topic/
  ```
  Example: `src/data/topic/myths-legends.json`

- **Topic images:**
  ```
  public/images/topic/<topic-slug>/
  ```
  Example: `public/images/topic/boruca-masks/cover.jpg`

> Use **lowercase** and **hyphens** for the `<topic-slug>` (no spaces).

### Topic JSON Template

Create a new file (e.g., `src/data/topic/myths-legends.json`) and paste:

```json
{
  "slug": "costa-rica-myths-and-legends",
  "title": "Costa Rican Myths and Legends",
  "emoji": "📜",
  "shortDescription": "Discover Costa Rica’s most famous myths and legends, exploring the stories, origins, and cultural significance behind each tale.",
  "longDescription": "Costa Rica’s myths and legends form a fascinating cultural tapestry, blending indigenous beliefs, Spanish colonial traditions, and Catholic mysticism into narratives passed down for generations. These stories feature ghostly apparitions, powerful witches, enchanted animals, and sacred guardians of nature. Some tales inspire fear and respect, like La Llorona and the Headless Priest, while others symbolize protection and guidance, like El Cadejos and the Dueño del Monte. Rooted deeply in local geography, history, and morality, each legend reflects Costa Rica’s identity and collective memory. By studying these myths, students gain insights into oral traditions, cultural heritage, and the universal themes of love, betrayal, faith, and redemption, fostering a greater appreciation of Costa Rica’s living folklore.",
  "cardImage": "/images/myths-legends/card.jpg",
  "wideImage": "/images/myths-legends/wide.jpg",
  "items": [
    {
      "title": "El Cadejos",
      "emoji": "🐺",
      "sections": [
        {
          "heading": "Information",
          "content": "El Cadejos is one of Costa Rica’s most iconic legends. It describes a spectral dog that appears on lonely roads at night, protecting some travelers while cursing others. There are two types: the white Cadejos, considered a guardian spirit, and the black Cadejos, associated with danger and death."
        },
        {
          "heading": "Legend and Story",
          "content": "According to the tale, the black Cadejos was once a cruel man who disrespected his parents and mistreated animals. As punishment, he was cursed to wander the earth in the form of a terrifying black dog with glowing red eyes, dragging chains and leaving an odor of sulfur wherever it roams. In contrast, the white Cadejos appears as a sign of hope, guiding lost travelers safely to their homes and protecting the innocent from evil spirits."
        },
        {
          "heading": "Cultural Meaning",
          "content": "The Cadejos represents the eternal struggle between good and evil and serves as a moral compass for rural communities. Parents often use the legend to warn their children about walking alone at night, teaching values of respect, caution, and responsibility."
        }
      ],
      "images": [
        "/images/myths-legends/cadejos-1.webp",
        "/images/myths-legends/cadejos-2.jpg"
      ]
    },
    {
      "title": "La Cegua (La Segua)",
      "emoji": "👠",
      "sections": [
        {
          "heading": "Information",
          "content": "La Cegua is a terrifying specter who punishes unfaithful and arrogant men. She appears at night as a beautiful young woman, dressed elegantly, asking travelers for help or a ride."
        },
        {
          "heading": "Legend and Story",
          "content": "When the unsuspecting victim accepts her request, she reveals her true face: a monstrous horse’s skull with glowing eyes and sharp teeth. Terrified, men often lose their sanity or are cursed to wander aimlessly. According to legend, she targets those who betray their partners or abuse women."
        },
        {
          "heading": "Symbolism",
          "content": "La Cegua represents the consequences of infidelity and vanity. Her story has been passed down through generations to promote loyalty, respect, and responsibility in relationships."
        }
      ],
      "images": [
        "/images/myths-legends/cegua-1.webp",
        "/images/myths-legends/cegua-2.jpg",
        "/images/myths-legends/cegua-3.webp"
      ]
    },
    {
      "title": "La Llorona",
      "emoji": "😢",
      "sections": [
        {
          "heading": "Information",
          "content": "La Llorona is one of Latin America’s most widespread legends and has deep roots in Costa Rican folklore. She is depicted as the ghost of a grieving mother wandering riverbanks at night, crying for her lost children."
        },
        {
          "heading": "Legend and Story",
          "content": "According to the tale, La Llorona drowned her children after being abandoned by their father. Overcome with guilt, she threw herself into the river and was condemned to roam forever, searching endlessly for the souls of her children. Her chilling cries, '¡Ay, mis hijos!', are said to echo through forests and valleys on quiet nights."
        },
        {
          "heading": "Cultural Impact",
          "content": "La Llorona embodies themes of regret, punishment, and grief. In Costa Rica, parents use the story to warn children against going near rivers alone and to encourage respect for family bonds."
        }
      ],
      "images": [
        "/images/myths-legends/llorona-1.jpg",
        "/images/myths-legends/llorona-2.webp"
      ]
    },
    {
      "title": "The Headless Priest",
      "emoji": "⛪",
      "sections": [
        {
          "heading": "Information",
          "content": "This legend originates from the ruins of Cartago, where locals claim to have seen a ghostly priest performing mass without a head. The story dates back to colonial times and remains one of Costa Rica’s most chilling tales."
        },
        {
          "heading": "Legend and Story",
          "content": "According to legend, the priest was accused of betraying his sacred vows and was murdered during a violent uprising. Cursed for eternity, he wanders the ruins at night, holding his severed head or appearing headless while whispering forgotten prayers."
        },
        {
          "heading": "Cultural Meaning",
          "content": "The Headless Priest represents divine punishment and warns against hypocrisy and sacrilege. It is also a reminder of Cartago’s turbulent colonial past and its deep connection to Catholic traditions."
        }
      ],
      "images": [
        "/images/myths-legends/headless-priest-1.png",
        "/images/myths-legends/headless-priest-2.jpg"
      ]
    },
    {
      "title": "La Carreta sin Bueyes",
      "emoji": "🛞",
      "sections": [
        {
          "heading": "Information",
          "content": "La Carreta sin Bueyes, or 'The Oxless Cart', is said to appear late at night, moving noisily through town without oxen or driver. Its rattling wheels and eerie creaks signal impending tragedy."
        },
        {
          "heading": "Legend and Story",
          "content": "This phantom cart is believed to be driven by cursed souls who once used their carts for selfish or immoral purposes, such as transporting bodies during epidemics or exploiting the poor. Those who encounter it are warned never to follow it, lest they disappear forever."
        },
        {
          "heading": "Symbolism",
          "content": "The story highlights themes of greed, justice, and respect for the dead. In many rural areas, the sound of creaking wheels at night still sends shivers through entire communities."
        }
      ],
      "images": [
        "/images/myths-legends/cart-1.webp",
        "/images/myths-legends/cart-2.jpg"
      ]
    },
    {
      "title": "El Dueño del Monte",
      "emoji": "🌲",
      "sections": [
        {
          "heading": "Information",
          "content": "El Dueño del Monte, or 'Master of the Mountain', is a supernatural guardian spirit of the forests, protecting wildlife and punishing those who harm nature unnecessarily."
        },
        {
          "heading": "Legend and Story",
          "content": "Described as a giant, hairy being with a single glowing eye, he emerges when hunters disrespect the forest by killing animals for sport. In some versions, he curses them to become wild beasts themselves, doomed to wander forever in the wilderness."
        },
        {
          "heading": "Cultural Meaning",
          "content": "This legend teaches deep respect for the environment and reflects Costa Rica’s long-standing cultural connection to nature conservation."
        }
      ],
      "images": [
        "/images/myths-legends/duenno-monte-1.jpg",
        "/images/myths-legends/duenno-monte-2.jpg"
      ]
    },
    {
      "title": "Diablo Chingo",
      "emoji": "🐂",
      "sections": [
        {
          "heading": "Information",
          "content": "Diablo Chingo, also called 'Chingo Negro', is a monstrous black bull with fiery red eyes and no tail, said to roam the plains of Guanacaste during stormy nights."
        },
        {
          "heading": "Legend and Story",
          "content": "According to locals, Diablo Chingo was once a rich cattle owner who cheated and abused his workers. As punishment, he was transformed into a furious, ghostly bull condemned to terrorize the same lands he once exploited."
        },
        {
          "heading": "Local Significance",
          "content": "The legend reflects Guanacaste’s deep cattle-ranching heritage and serves as a reminder of justice and humility."
        }
      ],
      "images": [
        "/images/myths-legends/diablo-chingo-1.jpg",
        "/images/myths-legends/diablo-chingo-2.jpg"
      ]
    },
    {
      "title": "Bruja Zárate",
      "emoji": "🧙‍♀️",
      "sections": [
        {
          "heading": "Information",
          "content": "Bruja Zárate was a legendary witch from Escazú, renowned for her magical powers and ability to control both nature and people."
        },
        {
          "heading": "Legend and Story",
          "content": "Stories describe her transforming vegetables into gold, casting spells over arrogant Spaniards, and defending the poor against injustice. One famous tale tells how she turned a wealthy governor into a peacock after he mocked her appearance."
        },
        {
          "heading": "Dual Nature",
          "content": "Bruja Zárate embodies both justice and vengeance, helping the humble while punishing the proud."
        }
      ],
      "images": [
        "/images/myths-legends/bruja-zarate-1.jpg",
        "/images/myths-legends/bruja-zarate-2.webp"
      ]
    },
    {
      "title": "Monja del Vaso",
      "emoji": "🪣",
      "sections": [
        {
          "heading": "Information",
          "content": "The legend of the Monja del Vaso, or 'Nun with the Glass', originates from San Juan de Dios Hospital in San José. Locals claim to see the ghostly figure of a nun wandering the halls late at night, carrying a glass of water to offer the sick."
        },
        {
          "heading": "Legend and Story",
          "content": "According to the tale, Sister María was a devoted nun who spent her life caring for the sick during an epidemic. One night, she accidentally gave a patient contaminated water that led to their death. Wracked with guilt, she passed away shortly after and her spirit now roams the hospital offering a symbolic glass of healing water to patients in need."
        },
        {
          "heading": "Cultural Meaning",
          "content": "The Monja del Vaso represents compassion, redemption, and eternal service. For many, her presence is considered a blessing, a reminder of faith, and the sacrifices of those who dedicate their lives to helping others."
        }
      ],
      "images": [
        "/images/myths-legends/monja-vaso-1.jpg",
        "/images/myths-legends/monja-vaso-2.jpg"
      ]
    },
    {
      "title": "Dabaiba",
      "emoji": "🔥",
      "sections": [
        {
          "heading": "Information",
          "content": "Dabaiba is a powerful supernatural witch believed to reside within Rincón de la Vieja Volcano in Guanacaste. Her name comes from pre-Columbian origins, linked to indigenous beliefs about volcano spirits."
        },
        {
          "heading": "Legend and Story",
          "content": "Dabaiba is described as a shape-shifting being: sometimes a beautiful young woman, other times a terrifying hag with fiery eyes and jaguar-like teeth. She is said to command volcanic eruptions and summon storms when angered. Some versions claim she guards ancient treasures hidden deep within the volcano’s caves."
        },
        {
          "heading": "Symbolism",
          "content": "This legend reflects the awe and respect that indigenous peoples had for volcanoes, considering them sacred places inhabited by divine beings. Dabaiba embodies the duality of creation and destruction tied to nature’s power."
        }
      ],
      "image": "/images/myths-legends/dabaiba-1.webp"
    },
    {
      "title": "The Legend of Iztaru",
      "emoji": "🏛️",
      "sections": [
        {
          "heading": "Information",
          "content": "The legend of Iztarú comes from the pre-Columbian era, originating in the valleys surrounding the Irazú Volcano. Iztarú is said to have been the daughter of a powerful indigenous chief."
        },
        {
          "heading": "Legend and Story",
          "content": "When Spanish conquistadors arrived, Iztarú led a desperate defense of her people. Facing defeat, she prayed to the gods, who answered by causing the Irazú Volcano to erupt violently, driving away the invaders. In some versions, Iztarú sacrificed herself to awaken the mountain’s fury."
        },
        {
          "heading": "Historical Echo",
          "content": "This legend honors indigenous resistance and connects Costa Ricans to their ancestral roots, emphasizing themes of courage, sacrifice, and protection of the land."
        }
      ],
      "images": [
        "/images/myths-legends/iztaru-1.jpg",
        "/images/myths-legends/iztaru-2.jpg"
      ]
    },
    {
      "title": "Turrialba Legend",
      "emoji": "🌋",
      "sections": [
        {
          "heading": "Information",
          "content": "The Turrialba Legend originates from the valleys surrounding the Turrialba Volcano and tells of forbidden love and tragedy among the indigenous tribes."
        },
        {
          "heading": "Legend and Story",
          "content": "According to the tale, an indigenous princess from Turrialba fell in love with a warrior from a rival tribe. Their forbidden romance angered their families, sparking a war. Heartbroken, the princess prayed to the volcano for help. In response, Turrialba erupted, forcing both tribes to reconcile or perish."
        },
        {
          "heading": "Cultural Roots",
          "content": "The legend symbolizes reconciliation, love, and unity, while highlighting the importance of natural landmarks as sacred spaces in Costa Rican history."
        }
      ],
      "images": [
        "/images/myths-legends/turrialba-1.jpg",
        "/images/myths-legends/turrialba-2.jpg"
      ]
    },
    {
      "title": "The Yegüita",
      "emoji": "🐴",
      "sections": [
        {
          "heading": "Information",
          "content": "The Yegüita is one of Nicoya’s most cherished legends and remains central to a traditional festival held every December."
        },
        {
          "heading": "Legend and Story",
          "content": "According to oral tradition, two indigenous tribes were about to engage in a bloody battle when a small, mystical mare appeared out of nowhere. The animal’s presence calmed the warriors, ending the conflict without violence. To commemorate this miracle, the Festival of La Yegüita is still celebrated in Nicoya today."
        },
        {
          "heading": "Symbolic Tale",
          "content": "The Yegüita symbolizes peace, forgiveness, and the power of faith to resolve conflicts. It is an enduring representation of Nicoya’s cultural identity."
        }
      ],
      "images": [
        "/images/myths-legends/yeguita-1.jpg",
        "/images/myths-legends/yeguita-2.jpg"
      ]
    },
    {
      "title": "Duendes del Bacín",
      "emoji": "🧚",
      "sections": [
        {
          "heading": "Information",
          "content": "The Duendes del Bacín are mischievous goblin-like spirits from Costa Rican folklore, often associated with protecting nature and punishing greedy humans."
        },
        {
          "heading": "Legend and Story",
          "content": "According to legend, duendes inhabit dense forests and riverbanks, playing pranks on travelers who disrespect nature. They are said to steal small objects, braid horses’ manes, and guide hunters astray. However, in some versions, duendes help those who protect the environment."
        },
        {
          "heading": "Cultural Blend",
          "content": "The myth combines indigenous beliefs in land spirits with Spanish colonial tales of magical beings, showing the cultural fusion that defines Costa Rican identity."
        }
      ],
      "images": [
        "/images/myths-legends/duendes-1.jpg",
        "/images/myths-legends/duendes-2.jpg"
      ]
    },
    {
      "title": "Mico Malo",
      "emoji": "🐒",
      "sections": [
        {
          "heading": "Information",
          "content": "Mico Malo, or 'Evil Monkey', is a terrifying supernatural creature feared in Costa Rican jungles. It is described as a huge black monkey with glowing red eyes and razor-sharp claws."
        },
        {
          "heading": "Legend and Story",
          "content": "Locals believe Mico Malo attacks those who harm the forest or disrespect sacred places. Witnesses describe hearing eerie screeches at night followed by scratching noises on trees and sudden disappearances of livestock. Some say it is the vengeful spirit of an ancient warrior transformed into a beast."
        },
        {
          "heading": "Folk Horror",
          "content": "The legend of Mico Malo reflects the deep connection between humans and wilderness, symbolizing nature’s fury against those who exploit it."
        }
      ],
      "images": [
        "/images/myths-legends/mico-malo-1.jpg",
        "/images/myths-legends/mico-malo-2.jpg"
      ]
    },
    {
      "title": "The Witch of Escazú (Doña Fustes)",
      "emoji": "🪡",
      "sections": [
        {
          "heading": "Information",
          "content": "Escazú is known as the 'City of Witches' in Costa Rica, and Doña Fustes is one of its most famous figures. Feared and respected, she was believed to practice powerful magic, both to heal and to harm."
        },
        {
          "heading": "Legend and Story",
          "content": "According to the tale, Doña Fustes crafted dolls from wax and cloth, sticking pins into them to curse her enemies or make them fall ill. People claim that anyone who crossed her would soon face strange accidents, sudden illnesses, or terrible misfortunes. Yet, she was also sought by many for remedies, blessings, and protection from other witches."
        },
        {
          "heading": "Moral Warning",
          "content": "This legend reflects fear of hidden malice within communities, showing how knowledge can be used for good or evil. Today, Escazú embraces its witchcraft heritage, hosting festivals and cultural events celebrating this unique folklore."
        }
      ],
      "images": [
        "/images/myths-legends/fustes-1.jpg",
        "/images/myths-legends/fustes-2.jpg"
      ]
    },
    {
      "title": "María la Negra",
      "emoji": "👤",
      "sections": [
        {
          "heading": "Information",
          "content": "María la Negra is an enigmatic figure whose story varies across Costa Rica. She is often described as a mysterious woman who appears at crossroads during stormy nights."
        },
        {
          "heading": "Legend and Story",
          "content": "Some tales portray María la Negra as a benevolent spirit helping lost travelers, while others describe her as a vengeful ghost luring men to their doom. In certain regions, she is linked to hidden treasures guarded by curses, requiring great courage to retrieve."
        },
        {
          "heading": "Folklore Role",
          "content": "María la Negra represents mystery, temptation, and the duality of good and evil. Her legend changes depending on who tells it, showing how oral tradition adapts over time."
        }
      ],
      "image": "/images/myths-legends/maria-negra-1.png"
    },
    {
      "title": "La Tulevieja",
      "emoji": "🪶",
      "sections": [
        {
          "heading": "Information",
          "content": "La Tulevieja is a terrifying spirit from Costa Rican and Panamanian folklore, often depicted as a winged woman with a disfigured face, long claws, and backward feet."
        },
        {
          "heading": "Legend and Story",
          "content": "According to the legend, La Tulevieja was once a young woman who drowned her newborn child to hide her shame after an affair. Cursed for her crime, she transformed into a monstrous being doomed to roam rivers, forests, and villages, punishing negligent mothers and unfaithful lovers."
        },
        {
          "heading": "Symbolism",
          "content": "This story warns against secrecy, betrayal, and abandoning responsibilities, serving as a cautionary tale passed down through generations."
        }
      ],
      "images": [
        "/images/myths-legends/tulevieja-1.jpg",
        "/images/myths-legends/tulevieja-2.jpg",
        "/images/myths-legends/tulevieja-3.webp"
      ]
    }
  ],
  "gallery": [
    "/images/myths-legends/gallery-1.jpg",
    "/images/myths-legends/gallery-2.jpg",
    "/images/myths-legends/gallery-3.jpg",
    "/images/myths-legends/gallery-4.jpg",
    "/images/myths-legends/gallery-5.jpg",
    "/images/myths-legends/gallery-6.jpg",
    "/images/myths-legends/gallery-7.webp",
    "/images/myths-legends/gallery-8.jpg"
  ],
  "references": [
    {
      "label": "Wikipedia – Tulevieja (ES; CR–Panama folk legend)",
      "url": "https://es.wikipedia.org/wiki/Tulevieja"
    },
    {
      "label": "SiCultura – History of Costa Rican Mascarada (context for legends in masks, ES)",
      "url": "https://si.cultura.cr/manifestaciones-culturales/historia-de-la-mascarada-tradicional-costarricense"
    },
    {
      "label": "SiCultura – Día de la Mascarada Tradicional (ES)",
      "url": "https://si.cultura.cr/manifestaciones-culturales/dia-de-la-mascarada-tradicional"
    },
    {
      "label": "https://es.wikipedia.org/wiki/Leyendas_de_Costa_Rica",
      "url": "https://es.wikipedia.org/wiki/Leyendas_de_Costa_Rica"
    },
    {
      "label": "Leyendas y relatos de Costa Rica",
      "url": "https://www.sanjosecostarica.org/sobre-san-jose-costa-rica/cultura-y-folklore/leyendas-de-costa-rica/"
    },
    {
      "label": "Leyendas de Costa Rica",
      "url": "https://www.mep.go.cr/educatico/leyendas-de-costa-rica"
    }
  ]
}
```

**Guidelines**
- `id` and paths in `"src"` must match your **slug** (folder name).
- `"alt"` must describe the image for accessibility.
- `"references"` must be **real, working links** (avoid 404 pages).
- JSON does **not** allow comments or trailing commas.

### Where to Place Images

Put all images for your topic under:

```
public/images/topic/<topic-slug>/
```

Examples:
```
public/images/topic/boruca-masks/cover.jpg
public/images/topic/boruca-masks/detail-1.jpg
```

Make sure your JSON uses `/images/topic/<topic-slug>/<file>` in the `"src"` fields.

### Preview and Test Locally

1. If the dev server is not running:
   ```bash
   # npm
   npm run dev

   # Bun
   bun run dev
   ```
2. Open the browser at `http://localhost:5173/`.
3. Navigate to your new topic.
4. Verify:
   - The page loads.
   - Images display correctly (no broken icons).
   - The browser **Console** (F12 → Console) shows **no errors**.

---

## Propose Your Changes (Branch + Pull Request)

Always use a **new branch** so the main project stays stable.

1. **Create a new branch**
   ```bash
   git checkout -b feature/topic-boruca-masks
   ```

2. **Save and commit your changes**
   ```bash
   git add .
   git commit -m "feat(topic): add Boruca Masks topic and images"
   ```

3. **Push your branch to GitHub**
   ```bash
   git push -u origin feature/topic-boruca-masks
   ```

4. **Open a Pull Request (PR)**
   - Go to your repository on GitHub.
   - Click **“Compare & pull request”**.
   - Write a clear title and description (what you added, any references).
   - Submit the PR for review.

5. **After approval**
   - A maintainer will **merge** your PR.
   - If changes are requested: edit files, **commit**, and **push** again; the PR updates automatically.

> **Tip (no terminal):** You can use **GitHub Desktop** to clone the repo and manage branches/commits with buttons. You still need **Node.js** to run `npm install` and `npm run dev` in the VS Code Terminal.

---

## Build for Production (Optional)

If you need an optimized build:

- **npm**
  ```bash
  npm run build
  npm run preview
  ```

- **Bun**
  ```bash
  bun run build
  bun run preview
  ```

This creates a `dist/` folder with the production files.  
`preview` serves the build locally for final testing.

---

## Recommended VS Code Extensions

- **ESLint** — code quality checks  
- **Prettier** — consistent formatting  
- (Built-in) **TypeScript and JavaScript Language Features**  
- **GitLens** — helpful Git history and insights

Open VS Code → **Extensions** (left sidebar icon) → search and **Install**.

---

## Troubleshooting

- **“command not found” for `git`, `node`, or `npm`:**  
  Close and reopen the terminal (or restart your computer) after installing tools. Then:
  ```bash
  git --version
  node -v
  npm -v
  ```
  You should see version numbers.

- **The site doesn’t open / Port in use:**  
  Vite uses **5173** by default. Change it if needed:
  ```bash
  # npm
  npm run dev -- --port=5174

  # Bun
  bun run dev -- --port=5174
  ```

- **Images don’t show:**  
  - Confirm files exist under `public/images/topic/<your-slug>/`.  
  - Confirm the JSON `"src"` path starts with `/images/topic/...`.

- **JSON parsing error:**  
  - JSON cannot contain comments or trailing commas.  
  - Validate your brackets `{}`, `[]`, commas, and quotes.

- **I’m lost with basic terminal navigation:**  
  - `cd folder-name` → enter a folder  
  - `cd ..` → go up one folder  
  - `ls` (macOS/Linux) or `dir` (Windows) → list files

---

## FAQ

**Do I need to know programming to add content?**  
No. Create one **JSON** file per topic in `src/data/topic/` and place your **images** in `public/images/topic/<topic-slug>/`. Test locally and open a Pull Request.

**Should I use npm or Bun?**  
If you’re new, use **npm**. If you’re comfortable and want faster installs, **Bun** is fine.

**How do I name files and folders?**  
Use lowercase and hyphens (no spaces), e.g., `boruca-masks.json`, `public/images/topic/boruca-masks/cover.jpg`.

**How do I edit or remove a topic?**  
Create a new branch, modify the JSON and/or images, test locally, then open a Pull Request describing the change.

---

*Thank you for contributing to CR Knowledge Hub!*
