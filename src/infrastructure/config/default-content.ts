import type { CmsContent } from "@/domain/entities/cms-content";

export const defaultContent: CmsContent = {
  services: [
    {
      id: "daire-ici-sap",
      title: "Daire içi şap",
      description:
        "Konut ve ticari alanlarda ölçülü, terazisinde ve zemin kaplamasına uygun şap uygulamaları.",
      icon: "⌂",
      active: true,
    },
    {
      id: "saha-betonu",
      title: "Saha betonu",
      description:
        "Otopark, depo, fabrika ve açık sahalara özel, yoğun kullanıma dayanıklı beton çözümleri.",
      icon: "▦",
      active: true,
    },
    {
      id: "insaat-isleri",
      title: "Genel inşaat işleri",
      description:
        "Projenizin farklı aşamalarında deneyimli ekibimiz ve iş planımızla yanınızdayız.",
      icon: "⌁",
      active: true,
    },
    {
      id: "fayans-uygulamalari",
      title: "Fayans işleri",
      description:
        "Banyo, mutfak ve yaşam alanlarında ölçülü uygulama ve özenli işçilikle fayans döşeme çözümleri.",
      icon: "▧",
      active: true,
    },
  ],
  projects: [
    {
      id: "endustriyel-tesis",
      category: "SAHA BETONU",
      title: "Endüstriyel tesis zemin uygulaması",
      location: "Bursa",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=85",
      images: [
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=85",
      ],
      description: "Endüstriyel tesis için dayanıklı beton zemin uygulaması.",
      status: "completed",
      active: true,
    },
    {
      id: "acik-saha-betonu",
      category: "SAHA BETONU",
      title: "Açık saha beton çalışması",
      location: "Bursa ve çevresi",
      image:
        "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1000&q=85",
      images: [
        "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1000&q=85",
      ],
      description: "Açık saha için dayanıklı beton uygulaması.",
      status: "completed",
      active: true,
    },
    {
      id: "konut-zemin-hazirligi",
      category: "DAİRE İÇİ ŞAP",
      title: "Konut projesi zemin hazırlığı",
      location: "Bursa",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
      ],
      description: "Konut projesinde daire içi şap uygulaması.",
      status: "completed",
      active: true,
    },
    {
      id: "fayans-uygulamasi",
      category: "FAYANS İŞLERİ",
      title: "Fayans uygulama çalışması",
      location: "Bursa ve çevresi",
      image:
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=85",
      images: [
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=85",
      ],
      description:
        "Banyo, mutfak ve yaşam alanları için özenli fayans döşeme uygulaması.",
      status: "completed",
      active: true,
    },
  ],
  inquiries: [],
  settings: {
    logo: "",
    phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "+90 535 680 14 89",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905356801489",
    email: "",
    serviceArea: "Bursa ve çevre iller",
    heroTitle: "Her yapının temeli sağlam olmalı.",
    heroDescription:
      "Şap betonu, saha betonu ve inşaat işlerinizde deneyimimizle yanınızdayız.",
    seo: {
      home: {
        title: "Bursa Şap Betonu ve Saha Betonu | Durmaz Kardeşler",
        description:
          "Bursa ve çevresinde daire içi şap, saha betonu, fayans ve inşaat uygulamaları. Projeniz için Durmaz Kardeşler Yapı İnşaat'tan teklif alın.",
      },
      services: {
        title: "Bursa Şap, Saha Betonu ve Fayans Hizmetleri",
        description:
          "Daire içi şap, saha betonu, fayans ve genel inşaat hizmetlerimizi inceleyin. Bursa ve çevre illerde projenize uygun çözüm için bize ulaşın.",
      },
      projects: {
        title: "Tamamlanan Projeler | Durmaz Kardeşler Yapı İnşaat",
        description:
          "Bursa ve çevresinde tamamlanan şap, saha betonu, fayans ve inşaat projelerimizden örnekleri inceleyin.",
      },
      about: {
        title: "Hakkımızda | Durmaz Kardeşler Yapı İnşaat",
        description:
          "Durmaz Kardeşler Yapı İnşaat'ın çalışma yaklaşımını, hizmet alanlarını ve Bursa'daki uygulama deneyimini tanıyın.",
      },
    },
    pageContent: {
      services: {
        sectionEyebrow: "HİZMETLERİMİZ",
        sectionTitle: "İhtiyacınıza özel.\nSağlam çözümler.",
        sectionDescription:
          "Projenizin her aşamasında, doğru uygulama ve özenli işçilikle yanınızdayız.",
        pageTitle: "Projenize uygun\nsağlam çözümler.",
        pageDescription:
          "İhtiyacınızı dinliyor, uygulama alanınıza ve kullanım amacınıza uygun işi planlayıp özenle hayata geçiriyoruz.",
      },
      projects: {
        sectionEyebrow: "SAHADAN KARELER",
        sectionTitle: "İşimiz\nkonuşsun.",
        sectionDescription:
          "Farklı ölçekteki zemin ve saha uygulamalarımızdan örnekler.",
        pageTitle: "İşimiz\nkonuşsun.",
        pageDescription:
          "Farklı ölçekteki zemin ve saha uygulamalarımızdan örnekler.",
        portfolioNote: "Yeni saha çalışmalarımızı portföyümüze eklemeye devam ediyoruz.",
      },
      about: {
        landingEyebrow: "YAKLAŞIMIMIZ",
        landingTitle: "İyi bir iş,\ndoğru zeminle\nbaşlar.",
        landingLead: "Her projeye aynı özeni, aynı iş disiplinini getiriyoruz.",
        landingDescription:
          "Durmaz Kardeşler Yapı İnşaat olarak daire içi şap, saha betonu ve genel inşaat işlerinizde ihtiyacınıza uygun çözümleri planlı ve titiz bir uygulamayla hayata geçiriyoruz.",
        heroEyebrow: "HAKKIMIZDA",
        heroTitle: "İyi bir iş,\ngüvenle başlar.",
        heroDescription:
          "Durmaz Kardeşler Yapı İnşaat olarak her projeye planlı çalışma, özenli uygulama ve sağlam işçilik anlayışıyla yaklaşıyoruz.",
        sectionEyebrow: "ÇALIŞMA ANLAYIŞIMIZ",
        sectionTitle: "Önce ihtiyacınızı\nanlıyoruz.",
        paragraphs: [
          "Her yapının ve uygulama alanının farklı ihtiyaçları olduğunu biliyoruz. Bu yüzden işe, projenizi ve beklentilerinizi dinleyerek başlıyoruz.",
          "Yerinde değerlendirme ve açık iletişimle doğru uygulama planını oluşturuyor; işimizi zamanında, titizlikle ve güvenilir biçimde tamamlamayı önemsiyoruz.",
        ],
        values: [
          {
            title: "İşinize özel planlama",
            description: "Uygulama alanına ve kullanım amacına göre çözüm geliştiriyoruz.",
          },
          {
            title: "Özenli işçilik",
            description: "Her aşamada detaylara ve uygulama kalitesine önem veriyoruz.",
          },
          {
            title: "Güvenilir iletişim",
            description: "İş planını ve süreci sizinle açıkça paylaşıyoruz.",
          },
        ],
      },
    },
  },
};
