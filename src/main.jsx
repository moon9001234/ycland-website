import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import "./styles.css";

const navItems = [
  ["首頁", "home"],
  ["服務", "services"],
  ["流程", "process"],
  ["收費標準", "fees"],
  ["官方資源", "resources"],
  ["聯絡方式", "contact"],
];

const services = [
  {
    variant: "transfer",
    title: "產權移轉登記",
    body: "專業把關每一道移轉程序，守護每一次產權交付。",
  },
  {
    variant: "inheritance",
    title: "繼承登記",
    body: "協助釐清繼承程序與稅務節點，順利完成產權承接與權益保障。",
  },
  {
    variant: "gift",
    title: "贈與登記",
    body: "依法規劃贈與流程，兼顧資產配置與稅務效益。",
  },
  {
    variant: "mortgage",
    title: "抵押權設定登記",
    body: "協助辦理抵押權設定與塗銷，確保貸款及擔保權益。",
  },
];

const processSteps = [
  ["consult", "初步諮詢", "了解您的需求與案件情況，釐清辦理方向及後續流程。"],
  ["check", "規劃方案", "依案件需求，規劃最適切的方案，說明流程與所需文件。"],
  ["submit", "委託辦理", "依委託內容辦理各項稅務申報與地政登記申請，全程掌握案件進度。"],
  ["archive", "完成交付", "完成登記作業，交付謄本、權狀或相關文件，守護您的不動產權益。"],
];

const feeSections = [
  {
    id: "contract",
    number: "一",
    title: "簽約手續費",
    items: [
      ["1", "簽約手續費", "2,000元", "立約人", "簽訂契約完畢給付，立約人每人各2,000元，每增加一人，加計500元，換約、修正契約，視異動內容幅度另行計費。"],
      ["2", "代擬契約", "1,500元", "委託人", "代擬不動產買賣或贈與契約乙式，並以電子檔交付，修改次數限一次。"],
    ],
  },
  {
    id: "transfer",
    number: "二",
    title: "所有權移轉登記",
    items: [
      ["1", "產權移轉申報及登記", "16,000元", "權利人(買方)", "一筆土地一棟建物16,000元，每增加一筆(棟)或一人，另加計2,000元。"],
      ["1-1", "實價登錄作業", "2,000元", "買賣雙方", "不動產買賣案件，代理向主管機關申報登錄，雙方各2,000元。"],
      ["1-2", "房地合一稅申報", "6,000元", "義務人(賣方)", "買賣登記完成後一個月內，向國稅局申報房地合一稅，繁複案件另行計費。"],
      ["1-3", "贈與稅申報", "5,000元", "贈與人", "繁複案件另行計費。"],
      ["1-4", "二親等非屬贈與移轉申報", "8,000元", "贈與人", "二等親間買賣需提供資金流向說明。"],
      ["1-5", "土地增值稅、契稅撤銷、更正", "5,000元", "委託人", "一筆土地一棟建物5,000元，每增加一筆(棟)或一人，另加計1,000元。"],
      ["2", "信託登記", "20,000元", "委託人", "自益信託一筆土地一棟建物20,000元，每增加一筆(棟)或一人，另加計2,500元；他益信託另行計費。"],
      ["3", "塗銷信託登記", "10,000元", "委託人", "一筆土地一棟建物10,000元，每增加一筆(棟)或一人，另加計1,000元。"],
      ["4", "共有物分割登記", "20,000元", "委託人", "共有人二人，分割後二筆20,000元，分割後每增加一筆或一人，另加計2,500元。"],
      ["5", "繼承/分割繼承登記", "30,000元", "委託人(繼承人)", "一般繼承(不動產登記)案件；繁複案件、動產、現金、股票另行計費。"],
      ["5-1", "遺產稅申報", "5,000元", "委託人(繼承人)", "代理向國稅局申報遺產稅；繁複案件另行計費。"],
      ["5-2", "拋棄繼承權申請", "8,000元", "委託人(繼承人)", "每增加一繼承人，另加計4,000元，存證信函費用另行計費。"],
      ["5-3", "遺產分割協議書", "6,000元", "委託人", "不動產六筆內、繼承人六名內同一管轄區6,000元，每增加一筆或一人，另加計500元，不同管轄區，另加計1,000元。"],
      ["6", "配偶剩餘財產差額分配請求登記", "30,000元", "委託人", "案件繁複另行計費。"],
      ["6-1", "配偶剩餘財產差額分配請求申報", "5,000元", "委託人", "代理向國稅局申報剩餘財產差額分配請求；繁複案件另行計費。"],
    ],
  },
  {
    id: "rights",
    number: "三",
    title: "他項權利登記",
    items: [
      ["1", "抵押權設定登記(金融機構)", "5,000元", "委託人", "一筆土地一棟建物5,000元，每增加一筆(棟)或一人，另加計1,000元。"],
      ["2", "抵押權塗銷登記(金融機構)", "3,000元", "委託人", "一筆土地一棟建物3,000元，每增加一筆(棟)或一人，另加計1,000元。"],
      ["3", "抵押權設定登記(私人民間)", "8,000元", "委託人", "一筆土地一棟建物8,000元，每增加一筆(棟)或一人，另加計1,000元。"],
      ["4", "抵押權塗銷登記(私人民間)", "4,000元", "委託人", "一筆土地一棟建物4,000元，每增加一筆(棟)或一人，另加計1,000元。"],
      ["5", "其他他項權利設定登記", "8,000元", "委託人", "一筆土地一棟建物8,000元，每增加一筆(棟)或一人，另加計1,000元。"],
      ["6", "其他他項權利塗銷登記", "5,000元", "委託人", "一筆土地一棟建物5,000元，每增加一筆(棟)或一人，另加計1,000元。"],
    ],
  },
  {
    id: "restriction",
    number: "四",
    title: "限制登記",
    items: [
      ["1", "預告登記", "5,000元", "委託人", "一筆土地一棟建物5,000元，每增加一筆(棟)或一人，另加計1,000元。"],
      ["2", "塗銷預告登記", "3,000元", "委託人", "一筆土地一棟建物3,000元，每增加一筆(棟)或一人，另加計1,000元。"],
    ],
  },
  {
    id: "tax",
    number: "五",
    title: "節稅申報",
    items: [
      ["1", "地價稅適自用優惠稅率申請", "1,000元", "所有權人(賣方)", "申請地價稅自用優惠稅率，如未核准，不予收費。"],
      ["2", "土地增值稅適自用優惠稅率申報", "5,000元", "所有權人(賣方)", "申請土增稅自用優惠稅率，如未核准，不予收費。"],
      ["3", "土地增值稅重購退稅", "8,000元起", "所有權人", "依退稅額5%計費；繁複案件另行計費。"],
      ["4", "房地合一稅申報", "8,000元", "所有權人(賣方)", "繁複案件另行計費。"],
      ["5", "房地合一稅重購退稅", "8,000元起", "所有權人", "依退稅額5%計費；繁複案件另行計費。"],
      ["6", "農地農用不課徵增值稅申報", "5,000元", "所有權人", "一筆土地5,000元，每增加一筆，另加計2,000元。"],
      ["7", "公共設施保留地不課徵增值稅申報", "5,000元", "所有權人", "一筆土地5,000元，每增加一筆，另加計2,000元。"],
    ],
  },
  {
    id: "other",
    number: "六",
    title: "其他",
    items: [
      ["1", "權利內容變更", "5,000元", "所有權人", "一筆土地一棟建物5,000元，每增加一筆(棟)或一人，另加計1,000元。"],
      ["2", "書狀補給登記", "4,000元", "委託人", "一筆土地一棟建物4,000元，每增加一筆(棟)或一人，另加計1,000元。"],
      ["3", "建物第一次登記", "30,000元", "委託人", "房屋保存登記，批量案件另議。"],
      ["4", "土地、建物合併或分割", "10,000元", "委託人", "申請人數超過二人或超過二筆合併者另行計費。"],
      ["5", "農地農用證明、土地鑑界、建物測量", "4,000元", "委託人", "北北基桃以外縣市，另加計車旅費(路程遙遠依里程另行計費)。"],
      ["6", "代撰書函、存證信函", "3,000起", "委託人", "海外授權書、協議書、政府單位申請書、陳述意見書，繁複案件另行計費。"],
      ["7", "代請各項證明文件", "1,000元", "委託人", "(1)使用分區證明(2)國稅局財產清冊(3)國稅局所得清冊(4)房屋稅籍證明。每增加一份（不同類文件），另加計500元。"],
      ["8", "跨縣市案件-車旅費", "2,000元", "委託人", "北北基桃以外縣市，另加計車旅費(路程遙遠依里程另行計費)。"],
      ["9", "產權調查", "2,000元", "委託人", "每次每筆不動產2,000元。"],
      ["10", "法令諮詢", "1,000元", "諮詢者", "案件法令、稅務相關諮詢，每小時1,000元，可全額折抵委任費。"],
    ],
  },
];

const feeNotes = [
  "本計費標準不包括地政、稅捐及公所單位相關政府規費、銀行帳管費、履約保證費及火災/地震險等保費；跨縣市或偏遠地區案件，需另加車旅費。",
  "本事務所服務項目未能逐一詳載，得視實際需要隨時修訂之，特殊案件另行報價，歡迎洽詢。",
  "本事務所推廣無紙化線上申辦措施，自行備齊自然人憑證等證件，親洽事務所辦理者，另有優惠。",
];

const resourceGroups = [
  {
    title: "地政項目",
    items: [
      ["桃園市地政e管家", "案件查詢、資料查詢、線上申辦、線上取號、AI輕鬆查", "https://www.land.tycg.gov.tw:18018/taoyuan_app2025/index.html"],
      ["桃園市政府地政局", "桃園市最新地政服務措施資訊", "https://www.land.tycg.gov.tw/"],
      ["地政資訊網路e點通服務系統", "全國電子謄本系統申請及查驗、北北桃實價登錄資訊、公告現值及公告地價查詢", "https://www.ttt.nat.gov.tw/"],
    ],
  },
  {
    title: "交易安全",
    items: [
      ["桃園市實價登錄查詢", "桃寶網結合AI智慧提供桃園住宅及不動產資訊", "https://taobao.tycg.gov.tw/"],
      ["不動產防詐專區", "申請稅籍、地籍異動即時通，雙重防線，守護資產，缺一不可。", "https://tytax.tycg.gov.tw/cp.aspx?n=25112"],
      ["電子產權憑證", "可線上下載電子產權憑證，代替出示紙本權狀，方便有驗證需求的承租人、銀行或地政士等快速線上查驗。", "https://rightland.moi.gov.tw/"],
    ],
  },
  {
    title: "地方稅",
    items: [
      ["地價稅", "查詢地價稅申報規定、應備文件及相關稅務資訊。申請自用住宅用地優惠稅率，本人或其配偶、直系親屬任一人必須在當年9月22日前在該地辦竣戶籍登記並申請。", "https://tytax.tycg.gov.tw/cl.aspx?n=4479"],
      ["房屋稅", "查詢房屋稅申報規定、應備文件及相關稅務資訊。申請自住房屋優惠稅率，本人、配偶或直系親屬任何一人必須在當年3月22日前辦竣戶籍登記並申請。", "https://tytax.tycg.gov.tw/cl.aspx?n=4461"],
      ["土地增值稅", "土地移轉時，買賣雙方應於土地買賣契約簽訂之日起30日內申報。自用住宅優惠稅率：符合條件者（如一生一次、一生一屋），可大幅降至 10% 且不計累進倍數。", "https://tytax.tycg.gov.tw/cl.aspx?n=4490", [["自用住宅優惠稅率", "https://tytax.tycg.gov.tw/cp.aspx?n=4494"]]],
      ["契稅", "不動產買賣，承典、交換、贈與、分割契約成立之日起或因占有而依法申請為所有人之日起30日內申報。", "https://tytax.tycg.gov.tw/cl.aspx?n=4500"],
      ["印花稅", "買賣不動產所立向主管機關申請物權登記之契據，每件按金額千分之一，由立約或立據人貼用印花稅票。", "https://tytax.tycg.gov.tw/cl.aspx?n=4506"],
    ],
  },
  {
    title: "遺產稅、贈與稅、所得稅",
    items: [
      ["遺產稅", "查詢遺產稅申報規定、應備文件及相關稅務資訊。", "https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-q-and-a/national/estate-tax"],
      ["贈與稅", "查詢贈與稅申報規定、應備文件及相關稅務資訊。", "https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-q-and-a/national/gift-tax"],
      ["房地合一稅", "提供房地合一稅2.0相關法規、申報規定、稅率及申報資訊查詢。", "https://www.mof.gov.tw/houseandland"],
    ],
  },
  {
    title: "便民工具",
    items: [
      ["公告現值及公告地價查詢", "全國公告現值及公告地價查詢", "https://www.land.moi.gov.tw/chhtml/landvalue/42"],
      ["地籍圖資網路便民服務系統", "提供以地號、建物門牌、村里等方式查詢土地位置，及區段徵收開發、市地重劃及農村社區土重劃案件、非都市土地分區及使用地類別等土地資訊查詢功能", "https://easymap.land.moi.gov.tw/W10Web/Normal"],
      ["地方稅網路申報作業", "備妥自然人憑證、健保卡，即可輕鬆線上申報「增值稅、契稅及印花稅」、「減免用地申辦」及「房屋使用情形變更」。", "https://net.tax.nat.gov.tw/"],
      ["行動自然人憑證", "結合手機生物辨識，實現免插卡、免輸密碼的數位身分驗證。", "https://fido.moi.gov.tw/"],
      ["內政部-數位櫃臺", "提供網路申辦、線上聲明登錄、線上支付規費、MyData查驗、申請地籍異動即時通、住址隱匿等線上服務。", "https://dcland.moi.gov.tw/"],
      ["地政法規", "連結內政部地政司掌握地政法規新訊、法規草案預告、解釋函令新訊等。", "https://www.land.moi.gov.tw/law/Index/100"],
    ],
  },
];

const resourceReminder =
  "本網站提供政府官方網站快速連結，所有資料均以主管機關最新公告為準。如需協助判斷是否適用您的案件，歡迎與云川地政士事務所聯繫。";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [openFeeIds, setOpenFeeIds] = useState([]);
  const [openResourceIds, setOpenResourceIds] = useState([]);
  const [contactNotice, setContactNotice] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const toggleFeeSection = (id) => {
    setOpenFeeIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };
  const toggleResourceGroup = (id) => {
    setOpenResourceIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };
  const handleContactSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const form = event.currentTarget;
    const message = [
      "【網站預約諮詢】",
      `姓名：${formData.get("name") || "未填寫"}`,
      `聯絡方式：${formData.get("contact") || "未填寫"}`,
      `方便聯繫時間：${formData.get("availableTime") || "未填寫"}`,
      `需求摘要：${formData.get("message") || "未填寫"}`,
      "來源：https://www.ycland.com.tw/",
    ].join("\n");
    const lineUrl = `https://line.me/R/oaMessage/%40613tgjsj/?${encodeURIComponent(message)}`;

    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(message)
        .then(() => {
          setContactNotice("已複製諮詢內容。如未自動開啟 LINE，請手動開啟官方 LINE 並貼上內容。");
        })
        .catch(() => {
          setContactNotice("系統正在開啟 LINE。如未自動開啟，請手動加入官方 LINE @613tgjsj。");
        });
    } else {
      setContactNotice("系統正在開啟 LINE。如未自動開啟，請手動加入官方 LINE @613tgjsj。");
    }

    const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobileDevice) {
      window.location.assign(lineUrl);
      return;
    }

    setContactSubmitting(true);
    setContactNotice("正在安全送出諮詢資料…");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          contact: formData.get("contact"),
          availableTime: formData.get("availableTime"),
          message: formData.get("message"),
          device: "電腦版",
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error("submit_failed");

      form.reset();
      setContactNotice("諮詢資料已送出，我們會儘快與您聯繫。");
    } catch {
      setContactNotice("目前無法送出，請稍後再試，或透過官方 LINE @613tgjsj 與我們聯繫。");
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="回到首頁">
          <span className="brand-mark">
            <img src="/yunchuan-logo.webp" alt="" />
          </span>
          <span>
            <strong>云川地政士/代書事務所</strong>
            <small>Yunchuan Land Administration Office</small>
          </span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "關閉選單" : "開啟選單"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="主要導覽">
          {navItems.map(([label, id]) => (
            <a
              key={id}
              className={activeId === id ? "active" : ""}
              href={`#${id}`}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="home" className="hero" aria-labelledby="hero-title">
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1 id="hero-title">
              <span>守護產權</span>
              <span>傳承價值</span>
              <span>安心託付</span>
            </h1>
            <p>
              我們以專業釐清法規、以細心守護權益，讓繁瑣的地政程序更簡單，陪伴每一位客戶安心完成每一次重要的資產規劃與傳承。
            </p>
            <div className="hero-actions">
              <a
                className="primary-action"
                href="https://line.me/R/ti/p/@613tgjsj"
                target="_blank"
                rel="noreferrer"
                aria-label="透過官方 LINE 預約諮詢，LINE ID @613tgjsj"
              >
                官方 LINE 預約諮詢
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
          <img
            className="hero-visual"
            src="/yunchuan-brand-hero.webp"
            alt="云川地政士事務所形象照：云以明理，川以承信"
          />
          <a className="scroll-cue" href="#services" aria-label="往下看服務內容">
            <ChevronDown size={24} aria-hidden="true" />
          </a>
        </section>

        <SectionIntro
          id="services"
          title="常見服務"
          body="產權登記｜稅務規劃｜法令諮詢"
        />
        <section className="service-grid" aria-label="常見服務列表">
          {services.map(({ variant, title, body }) => (
            <article className="service-card" key={title}>
              <div className="service-icon">
                <ServiceIllustration variant={variant} />
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </section>

        <section id="process" className="band process-band" aria-labelledby="process-title">
          <div className="section-heading compact">
            <h2 id="process-title">辦理流程</h2>
            <p>從傾聽需求到完成交付，云川以專業闡明流程、細心把關每個環節，陪伴您安心完成每一次委託。</p>
          </div>
          <div className="timeline">
            {processSteps.map(([variant, title, body], index) => (
              <article className="timeline-item" key={title}>
                <div className="process-illustration-wrap">
                  <span className="process-number">{index + 1}</span>
                  <ProcessIllustration variant={variant} />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="fees" className="section-wrap" aria-labelledby="fees-title">
          <div className="section-heading fees-heading">
            <h2 id="fees-title">收費標準</h2>
            <p>
              秉持誠信與透明的服務理念，於委託前完整說明各項費用與辦理內容，讓您安心了解、放心委託。
            </p>
          </div>
          <div className="fee-accordion">
            {feeSections.map((section) => {
              const isOpen = openFeeIds.includes(section.id);
              return (
                <article className="fee-panel" key={section.id}>
                  <button
                    className="fee-toggle"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`fee-panel-${section.id}`}
                    onClick={() => toggleFeeSection(section.id)}
                  >
                    <span className="fee-title">{section.title}</span>
                    <ChevronDown className={isOpen ? "chevron is-open" : "chevron"} size={22} aria-hidden="true" />
                  </button>
                  {isOpen && (
                    <div className="fee-panel-body" id={`fee-panel-${section.id}`}>
                      <div className="fee-table-wrap">
                        <table className="fee-table">
                          <thead>
                            <tr>
                              <th>服務項目</th>
                              <th>計費標準</th>
                              <th>說明</th>
                            </tr>
                          </thead>
                          <tbody>
                            {section.items.map(([number, item, price, target, note]) => (
                              <tr key={`${section.id}-${number}-${item}`}>
                                <td>{item}</td>
                                <td>{price}</td>
                                <td>{note}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          <div className="fee-notes" aria-label="收費標準備註">
            {feeNotes.map((note, index) => (
              <p key={note}>
                <strong>{index + 1}.</strong> {note}
              </p>
            ))}
          </div>
        </section>

        <section id="resources" className="band" aria-labelledby="resources-title">
          <div className="section-heading">
            <h2 id="resources-title">官方資源</h2>
            <p>彙整地政相關官方資源，協助您掌握最新資訊，快速查詢法規、公告及各項申辦服務。</p>
          </div>
          <div className="resource-accordion">
            {resourceGroups.map((group) => {
              const isOpen = openResourceIds.includes(group.title);
              return (
                <article className="resource-panel" key={group.title}>
                  <button
                    className="resource-toggle"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`resource-panel-${group.title}`}
                    onClick={() => toggleResourceGroup(group.title)}
                  >
                    <span className="resource-title">{group.title}</span>
                    <ChevronDown className={isOpen ? "chevron is-open" : "chevron"} size={22} aria-hidden="true" />
                  </button>
                  {isOpen && (
                    <div className="resource-panel-body" id={`resource-panel-${group.title}`}>
                      <div className="resource-grid">
                        {group.items.map(([title, body, url, relatedLinks]) => (
                          <article
                            className="resource-card"
                            key={`${group.title}-${title}`}
                          >
                            <a className="resource-main-link" href={url} target="_blank" rel="noreferrer">
                              <span>
                                <ExternalLink size={20} aria-hidden="true" />
                              </span>
                              <strong>{title}</strong>
                            </a>
                            <p>{body}</p>
                            {relatedLinks && (
                              <div className="resource-related-links">
                                {relatedLinks.map(([label, link]) => (
                                  <a href={link} target="_blank" rel="noreferrer" key={label}>
                                    {label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </article>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          <div className="resource-reminder">
            <ShieldCheck size={22} aria-hidden="true" />
            <p>{resourceReminder}</p>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="contact-panel">
            <div className="section-heading left">
              <h2 id="contact-title">預約諮詢與聯絡</h2>
              <p>
                我們重視每一次委託，傾聽每一項需求，結合法規專業與實務經驗，提供最適切的建議與完善的服務，讓您在不動產交易、資產傳承及權益保障的每一個環節，都能安心、放心。
              </p>
            </div>
          </div>
          <form className="contact-form" aria-label="聯絡表單示意" onSubmit={handleContactSubmit}>
            <label>
              姓名
              <input type="text" name="name" placeholder="請輸入姓名及稱謂" required />
            </label>
            <label>
              聯絡方式
              <input type="text" name="contact" placeholder="請輸入聯絡方式" required />
            </label>
            <label>
              方便聯繫時間
              <input type="text" name="availableTime" placeholder="例如：平日下午、週三上午" />
            </label>
            <label>
              簡述您的需求
              <textarea name="message" rows="4" placeholder="簡述您的需求"></textarea>
            </label>
            <button type="submit" disabled={contactSubmitting}>
              {contactSubmitting ? "送出中…" : "送出諮詢"}
              <CheckCircle2 size={18} aria-hidden="true" />
            </button>
            {contactNotice && (
              <p className="contact-notice" role="status">
                {contactNotice}
              </p>
            )}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <div className="footer-office-name">
            <strong>云川 地政士事務所</strong>
            <span>Yunchuan Land Administration Office</span>
          </div>
          <p>鄭雅云 地政士 / 代書</p>
          <p className="footer-contact-numbers">
            <span>電話：03-355-2366</span>
            <span>傳真：03-355-8090</span>
          </p>
          <p>地址：330桃園市桃園區水汴二路21號1F</p>
          <p>Email：ycland.tw@gmail.com</p>
          <p>開業執照字號：（115）桃市地字第002651號</p>
        </div>
        <a href="#home">回到頁首</a>
      </footer>
    </>
  );
}

function SectionIntro({ id, kicker, title, body }) {
  return (
    <section id={id} className="section-wrap" aria-labelledby={`${id}-title`}>
      <div className="section-heading">
        {kicker && <p className="eyebrow">{kicker}</p>}
        <h2 id={`${id}-title`}>{title}</h2>
        {body && <p>{body}</p>}
      </div>
    </section>
  );
}

function ServiceIllustration({ variant }) {
  return (
    <img
      className={`service-illustration service-illustration-${variant}`}
      src={`/service-${variant}.webp`}
      alt=""
      loading="lazy"
    />
  );
}

function ProcessIllustration({ variant }) {
  const id = `process-${variant}`;

  return (
    <svg className={`process-illustration process-illustration-${variant}`} viewBox="0 0 220 220" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-sky`} x1="26" y1="20" x2="186" y2="198" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f9faf3" />
          <stop offset="1" stopColor="#dceee7" />
        </linearGradient>
        <linearGradient id={`${id}-gold`} x1="54" y1="40" x2="170" y2="186" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f3cf7a" />
          <stop offset="1" stopColor="#d9a13d" />
        </linearGradient>
        <linearGradient id={`${id}-blue`} x1="42" y1="28" x2="178" y2="190" gradientUnits="userSpaceOnUse">
          <stop stopColor="#70b8d8" />
          <stop offset="1" stopColor="#2e6d8b" />
        </linearGradient>
        <linearGradient id={`${id}-green`} x1="30" y1="30" x2="186" y2="190" gradientUnits="userSpaceOnUse">
          <stop stopColor="#56a781" />
          <stop offset="1" stopColor="#17533f" />
        </linearGradient>
      </defs>
      <circle cx="110" cy="110" r="96" fill={`url(#${id}-sky)`} />
      <circle cx="110" cy="110" r="90" fill="none" stroke="#c6d9d1" strokeWidth="2" strokeDasharray="6 7" />
      <path d="M38 156c34 26 96 32 144-2" fill="none" stroke="#f0d28d" strokeWidth="12" strokeLinecap="round" opacity="0.55" />

      {variant === "consult" && (
        <>
          <circle cx="92" cy="87" r="25" fill="#f7d188" />
          <path d="M58 164c5-32 21-48 47-48s42 16 47 48" fill="#ffffff" stroke="#17533f" strokeWidth="7" strokeLinejoin="round" />
          <circle cx="92" cy="84" r="20" fill="#ffffff" stroke="#17533f" strokeWidth="7" />
          <path d="M132 58h44a13 13 0 0 1 13 13v30a13 13 0 0 1-13 13h-16l-18 18v-18h-10a13 13 0 0 1-13-13V71a13 13 0 0 1 13-13Z" fill="#ffffff" stroke="#2e6d8b" strokeWidth="7" strokeLinejoin="round" />
          <circle cx="142" cy="86" r="4" fill="#d9a13d" />
          <circle cx="156" cy="86" r="4" fill="#d9a13d" />
          <circle cx="170" cy="86" r="4" fill="#d9a13d" />
        </>
      )}

      {variant === "check" && (
        <>
          <path d="M70 46h58l34 34v88a12 12 0 0 1-12 12H70a12 12 0 0 1-12-12V58a12 12 0 0 1 12-12Z" fill="#ffffff" stroke="#17533f" strokeWidth="7" strokeLinejoin="round" />
          <path d="M127 48v34h34" fill="#dceee7" stroke="#17533f" strokeWidth="7" strokeLinejoin="round" />
          <path d="M78 98h52M78 122h48M78 146h34" stroke="#6a7c76" strokeWidth="7" strokeLinecap="round" />
          <circle cx="150" cy="150" r="31" fill={`url(#${id}-green)`} />
          <path d="m137 151 10 10 20-25" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      {variant === "submit" && (
        <>
          <path d="M42 105 176 46l-43 128-29-50-62-19Z" fill="#ffffff" stroke="#17533f" strokeWidth="7" strokeLinejoin="round" />
          <path d="M104 124 176 46" fill="none" stroke="#17533f" strokeWidth="7" strokeLinecap="round" />
          <path d="m104 124 11 48 18-48" fill="#dceee7" stroke="#17533f" strokeWidth="7" strokeLinejoin="round" />
          <path d="M54 63h42M38 83h34M50 147h34" stroke={`url(#${id}-gold)`} strokeWidth="8" strokeLinecap="round" opacity="0.9" />
        </>
      )}

      {variant === "archive" && (
        <>
          <path d="M48 75a13 13 0 0 1 13-13h44l18 18h50a13 13 0 0 1 13 13v18H48V75Z" fill="#f7d188" stroke="#17533f" strokeWidth="7" strokeLinejoin="round" />
          <path d="M44 101h145l-18 73a14 14 0 0 1-14 11H66a14 14 0 0 1-14-11l-8-73Z" fill="#ffffff" stroke="#17533f" strokeWidth="7" strokeLinejoin="round" />
          <path d="M76 132h70M76 156h48" stroke="#6a7c76" strokeWidth="7" strokeLinecap="round" />
          <circle cx="162" cy="157" r="25" fill={`url(#${id}-blue)`} />
          <path d="m149 157 9 9 18-22" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

createRoot(document.getElementById("root")).render(<App />);
