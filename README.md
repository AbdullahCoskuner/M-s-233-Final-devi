# Abdullah - Hello World Chart Plugin

Superset için hazırlanmış basit ama net bir "Hello World" görselleştirme eklentisi. Hedef: Superset eklenti geliştirme zincirini baştan sona göstermek ve kendi grafiklerinizi hızla türetebilmeniz için temiz bir şablon sunmak.

## Özellikler
- React + TypeScript ile yazılmış minimal görselleştirme bileşeni
- `ChartPlugin` yapısı ile dinamik yükleme ve metadata tanımı
- Demo ortamı için webpack-dev-server (port 9000)
- Üretim için `tsc + webpack` ile `lib/` çıktısı

## Hızlı Kurulum
```bash
cd superset/superset-frontend/packages/superset-plugin-chart-abdullah
npm install
npm run build
```
`lib/` klasörü üretim paketini içerir.

## Geliştirme / Canlı Önizleme
```bash
npm run start
```
- Webpack dev server otomatik olarak `http://localhost:9000` adresini açar.
- Kaynak dosyaları `src/demo/` altındadır; canlı yenileme açıktır.

## Superset İçine Entegrasyon
1) Paketi build edin: `npm run build`
2) Superset frontend içinde plugin'i kaydedin (örnek):
```ts
import SupersetPluginChartAbdullah from '@superset-ui/plugin-chart-abdullah';

new SupersetPluginChartAbdullah()
	.configure({ key: 'abdullah-hello-world' })
	.register();
```
3) Superset'i yeniden derleyin/başlatın ve grafik listesinde `Abdullah - Hello World` olarak seçin.

## Proje Yapısı
- `src/index.tsx`: React bileşeni ve basit tasarım.
- `src/plugin/index.ts`: `ChartPlugin` tanımı ve dinamik yükleme.
- `src/demo/`: Webpack dev server için demo sayfası.
- `webpack.demo.config.js`: Demo yapılandırması (port 9000, hot reload).
- `webpack.config.js`: Üretim paketi yapılandırması (`lib/`).

## NPM Scriptleri
- `npm run start`: Demo (webpack-dev-server, port 9000)
- `npm run dev`: Watch modunda hızlı paketleme
- `npm run build`: `tsc` + üretim webpack çıktısı (`lib/`)
- `npm run prepublishOnly`: Yayın öncesi otomatik build

## Notlar
- Peer bağımlılığı olarak Superset çekirdeği: `@superset-ui/core` (`^0.16.0 || ^0.17.0 || ^0.18.0`).
- React 17 ile test edilmiştir.

## Lisans
MIT
