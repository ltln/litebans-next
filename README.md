# LiteBans-next
Web interface for [LiteBans](https://www.spigotmc.org/resources/litebans.3715) using Next.js
### Features
[ ] All features from [litebans-php](https://gitlab.com/ruany/litebans-php)
[x] [TailwindCSS](https://tailwindcss.com/) + [shadcn-ui](https://ui.shadcn.com)
[ ] Light & dark mode
[ ] Localization
[x] Language switcher
### Getting Started
1. Clone this repository
```bash
git clone https://github.com/ltln/litebans-next.git
```
2. Install packages
```bash
npm install # or pnpm install or yarn install
```
3. Rename and edit config file
```bash
cp src/lib/config.example.ts src/lib/config.ts
nano src/lib/config.ts # or vim src/lib/config.ts
```
4. Build and run
```bash
npm run build
npm start
```
Your website is served at **localhost:3000**
### Development
```bash
npm install # or pnpm install or yarn install
npm run dev # localhost:3000
```
### Contributing
All contributions are greatly appeciated. To start contributing, fork this repository and create a pull request.
1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
### License
Distributed under the MIT License. See `LICENSE` for more information.