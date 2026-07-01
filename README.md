# F&B Estética Automotiva

Site institucional da **F&B Estética Automotiva** — polimento, vitrificação, higienização e lavagem detalhada em São Paulo.

## Estrutura

```
FB-ESTETICA/
├── index.html    # Landing page completa (HTML, CSS, JS e imagens embutidas)
└── README.md
```

## Desenvolvimento local

Abra `index.html` no navegador ou use um servidor local:

```bash
npx serve .
```

## Publicar no GitHub

```bash
cd C:\Users\FIC\Desktop\FB-ESTETICA
git remote add origin https://github.com/abarakus11/FB.git
git branch -M main
git push -u origin main
```

## GitHub Pages

1. No repositório, vá em **Settings → Pages**
2. Em **Source**, selecione **Deploy from a branch**
3. Branch: **main** · Pasta: **/ (root)**
4. O site ficará em: `https://abarakus11.github.io/FB/`

## Vercel (opcional)

1. Importe o repositório em [vercel.com](https://vercel.com)
2. Framework preset: **Other**
3. Deploy automático a cada push na branch `main`
