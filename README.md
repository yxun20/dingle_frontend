```markdown
# 딩글딩글: 아기와 함께하는 편안한 밤

<img width="1515" alt="스크린샷 2025-06-19 오후 11 14 05" src="https://github.com/user-attachments/assets/e1dca51b-b70b-4849-b335-1a4d33b54322" />

## 📚 소개
**딩글딩글(Dingle-Dingle)**은 AI 기반의 스마트 아기 모니터링 애플리케이션으로, 아기의 안전을 지키고 부모에게 밤 동안 안심을 제공하기 위해 개발되었습니다.  
CNN 기반 울음소리 분석과 실시간 자세 추정 기술을 결합하여, 아기의 다양한 울음 유형을 감지하고 위험 자세를 식별하여 질식이나 추락을 예방합니다.

## 🔎 주요 기능
- **실시간 울음소리 분석**: 배고픔, 불편함, 트림, 통증, 피로 등 아기의 울음을 분류함  
- **실시간 자세 추정**: 아기의 위험한 자세를 감지하여 질식 및 추락 위험 시 즉시 보호자에게 알림  
- **일일 통계 시각화**: 아기의 울음 패턴 및 자세 데이터를 시각화하여 보호자에게 제공

## 📢 시스템 아키텍처
<img width="1109" alt="스크린샷 2025-06-19 오후 11 15 32" src="https://github.com/user-attachments/assets/66dbcd39-de29-4048-b56a-ab567567f238" />

## 💻 개발 기술 스택
### **프론트엔드**
- React: UI 프레임워크  
- TypeScript: 타입 안정성을 제공하는 언어  
- Vite: 빠르고 가벼운 빌드 도구  
- TailwindCSS: 오픈소스 CSS 프레임워크  
- lucide-react: React용 아이콘 컴포넌트 라이브러리  
- zustand: 상태 관리 라이브러리  

### **백엔드**
- Spring Boot, Java: API 서버 프레임워크  
- NestJS, TypeScript: SSE Gateway 구현  

### **데이터베이스**
- MySQL: 관계형 데이터베이스  
- Redis: 캐시 시스템  

### **AI**
- Python  
- FastAPI  
- TensorFlow, PyTorch  
- OpenCV  

### **인프라**
- Docker  
- Docker Compose  
- AWS EC2, S3, RDS, CodeDeploy, CloudFront  

## 🏗 프로젝트 구조
\`\`\`text
.
├── README.md
├── api
│   ├── Dockerfile
│   ├── README.md
│   ├── build.gradle
│   ├── docker-compose.yml
│   ├── fastapp
│   │   ├── Dockerfile
│   │   ├── app.py
│   │   ├── models
│   │   ├── requirements.txt
│   │   ├── static
│   │   ├── utils
│   │   └── yolov8n.pt
│   ├── gradle
│   │   └── wrapper
│   ├── gradlew
│   ├── gradlew.bat
│   ├── models
│   │   ├── cnn_model.h5
│   │   ├── seg_best.pt
│   │   ├── yolov8n-pose.pt
│   │   └── yolov8n-seg.pt
│   ├── settings.gradle
│   └── src
│       ├── main
│       └── test
├── frontend
│   ├── README.md
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── fonts
│   │   └── vite.svg
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── index.css
│   │   ├── lib
│   │   ├── main.tsx
│   │   ├── pages
│   │   ├── services
│   │   ├── store
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── ws-gateway
    ├── README.md
    ├── apps
    │   ├── domain
    │   └── gateway
    ├── db
    │   └── kysely
    ├── nest-cli.json
    ├── package-lock.json
    ├── package.json
    ├── tsconfig.build.json
    └── tsconfig.json
\`\`\`

## 🏛️ 데이터베이스 ERD
![db](https://github.com/user-attachments/assets/61d1adfb-783f-49f4-bcc8-da462f435103)

## 🎞️ 데모 영상
실제 시연 영상 보기: [데모 영상 링크](https://youtu.be/YCgK8OtZoHo)

## 📊 학습 데이터 출처
- **울음소리 분석 데이터셋**: [Baby Cry Classification - Kaggle](https://www.kaggle.com/datasets/bhoomikavalani/donateacrycorpusfeaturesdataset)  
  → 배고픔, 불편함, 트림, 통증, 피로 등 총 5가지 유형의 라벨이 붙은 오디오 클립 5,000개 사용  
- **자세 추정 데이터셋**: [COCO Keypoints](https://cocodataset.org/#download) + 어두운 환경에서도 정확도를 높이기 위해 자체 주석 작업한 아기 이미지 2,000장 추가  

## 👥 팀원 소개

|               | 성영준 | 구예원 | 오현택 | 박유빈 | 김승겸 |
|---------------|:------:|:------:|:------:|:------:|:------:|
| **담당 역할** | 프론트엔드 / 백엔드 | 프론트엔드 | 프론트엔드 / 백엔드 | 인공지능 / 백엔드 | 인공지능 |
| **프로필**   | <img src="https://avatars.githubusercontent.com/yxun20" width="110" /> | <img src="https://avatars.githubusercontent.com/9ye1" width="110" /> | <img src="https://avatars.githubusercontent.com/HyunTaek5" width="110" /> | <img src="https://avatars.githubusercontent.com/yubin012" width="110" /> | <img src="https://avatars.githubusercontent.com/Gyeom-s" width="110" /> |
| **GitHub**    | [@yxun20](https://github.com/yxun20) | [@9ye1](https://github.com/9ye1) | [@HyunTaek5](https://github.com/HyunTaek5) | [@yubin012](https://github.com/yubin012) | [@Gyeom-s](https://github.com/Gyeom-s) |
```
