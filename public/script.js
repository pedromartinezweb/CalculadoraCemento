const RECIPES = {
  mortar: {
    strengths: {
      strong: { cement: 1, sand: 3.33, waterRatio: 0.5 },
      medium: { cement: 1, sand: 4.44, waterRatio: 0.55 },
      low: { cement: 1, sand: 6.67, waterRatio: 0.6 },
    },
  },
  concrete: {
    strengths: {
      strong: { cement: 1, sand: 2.37, stone: 2.62, waterRatio: 0.48 },
      medium: { cement: 1, sand: 3.02, stone: 3.09, waterRatio: 0.55 },
      low: { cement: 1, sand: 4.44, stone: 6.25, waterRatio: 0.55 },
    },
  },
};

const STORAGE_KEY = "cement-calc-last-selection";
const PRESETS = ["5", "10", "25", "35", "50"];
const DEFAULT_LANGUAGE = "es";
const SUPPORTED_LANGUAGES = ["es", "en", "zh", "hi", "ar", "bn", "pt", "ru", "ja", "fr", "de", "id"];

const TEXTS = {
  es: {
    htmlLang: "es",
    dir: "ltr",
    title: "Calculadora de cemento",
    description: "Calculadora de cemento para dosificar mortero y hormigon por peso en kg.",
    heroEyebrow: "Mortero y hormigon",
    heroTitle: "Receta por peso",
    heroIntro: "Introduce los kg de cemento, elige la mezcla y la resistencia. Calcularemos arena, piedra y agua para usar con bascula.",
    cement: "Cemento",
    inKg: "En kg",
    adjustCement: "Ajustar cemento",
    subtractKg: "Restar 1 kg",
    addKg: "Sumar 1 kg",
    cementKg: "Kilogramos de cemento",
    presets: "Cantidades frecuentes",
    mix: "Mezcla",
    mortar: "Mortero",
    concrete: "Hormigon",
    strength: "Resistencia",
    strong: "Fuerte",
    medium: "Media",
    low: "Baja",
    ratio: "Peso",
    recipeStrength: { strong: "fuerte", medium: "medio", low: "bajo" },
    material: { cement: "Cemento", sand: "Arena", stone: "Piedra", water: "Agua", total: "Arena + piedra" },
    waterUnit: "kg / litros",
    noteConcrete: "Dosificacion por peso para bascula: {cement} kg de cemento, {sand} kg de arena y {stone} kg de piedra.",
    noteMortar: "Dosificacion por peso para bascula: {cement} kg de cemento y {sand} kg de arena.",
    warning: "Dosificacion pensada para bascula. El agua se pesa o mide en litros y se ajusta poco a poco segun humedad de la arena, granulometria y consistencia necesaria.",
    invalidCement: "Los kg de cemento deben ser mayores que cero.",
    invalidMix: "Tipo de mezcla no valido.",
    invalidRecipe: "Tipo de receta no valido.",
    checkData: "Revisa los datos",
    notCalculable: "No se puede calcular",
  },
  en: {
    htmlLang: "en",
    dir: "ltr",
    title: "Cement calculator",
    description: "Cement calculator for mortar and concrete mixes by weight in kg.",
    heroEyebrow: "Mortar and concrete",
    heroTitle: "Recipe by weight",
    heroIntro: "Enter the cement kg, choose the mix and strength. We calculate sand, stone and water for scale-based dosing.",
    cement: "Cement",
    inKg: "In kg",
    adjustCement: "Adjust cement",
    subtractKg: "Subtract 1 kg",
    addKg: "Add 1 kg",
    cementKg: "Kilograms of cement",
    presets: "Common amounts",
    mix: "Mix",
    mortar: "Mortar",
    concrete: "Concrete",
    strength: "Strength",
    strong: "Strong",
    medium: "Medium",
    low: "Low",
    ratio: "Weight",
    recipeStrength: { strong: "strong", medium: "medium", low: "low" },
    material: { cement: "Cement", sand: "Sand", stone: "Stone", water: "Water", total: "Sand + stone" },
    waterUnit: "kg / liters",
    noteConcrete: "Weight dosing for scales: {cement} kg of cement, {sand} kg of sand and {stone} kg of stone.",
    noteMortar: "Weight dosing for scales: {cement} kg of cement and {sand} kg of sand.",
    warning: "Dosing is designed for scales. Water is weighed or measured in liters and adjusted gradually according to sand moisture, aggregate size and required consistency.",
    invalidCement: "Cement kg must be greater than zero.",
    invalidMix: "Invalid mix type.",
    invalidRecipe: "Invalid recipe type.",
    checkData: "Check the data",
    notCalculable: "Cannot calculate",
  },
  fr: {
    htmlLang: "fr",
    dir: "ltr",
    title: "Calculateur de ciment",
    description: "Calculateur de ciment pour doser mortier et beton au poids en kg.",
    heroEyebrow: "Mortier et beton",
    heroTitle: "Recette au poids",
    heroIntro: "Saisissez les kg de ciment, choisissez le melange et la resistance. Nous calculons le sable, la pierre et l'eau pour une pesee a la balance.",
    cement: "Ciment",
    inKg: "En kg",
    adjustCement: "Ajuster le ciment",
    subtractKg: "Retirer 1 kg",
    addKg: "Ajouter 1 kg",
    cementKg: "Kilogrammes de ciment",
    presets: "Quantites frequentes",
    mix: "Melange",
    mortar: "Mortier",
    concrete: "Beton",
    strength: "Resistance",
    strong: "Fort",
    medium: "Moyen",
    low: "Faible",
    ratio: "Poids",
    recipeStrength: { strong: "fort", medium: "moyen", low: "faible" },
    material: { cement: "Ciment", sand: "Sable", stone: "Pierre", water: "Eau", total: "Sable + pierre" },
    waterUnit: "kg / litres",
    noteConcrete: "Dosage au poids pour balance: {cement} kg de ciment, {sand} kg de sable et {stone} kg de pierre.",
    noteMortar: "Dosage au poids pour balance: {cement} kg de ciment et {sand} kg de sable.",
    warning: "Dosage prevu pour une balance. L'eau se pese ou se mesure en litres et s'ajuste progressivement selon l'humidite du sable, la granulometrie et la consistance souhaitee.",
    invalidCement: "Les kg de ciment doivent etre superieurs a zero.",
    invalidMix: "Type de melange invalide.",
    invalidRecipe: "Type de recette invalide.",
    checkData: "Verifiez les donnees",
    notCalculable: "Calcul impossible",
  },
  pt: {
    htmlLang: "pt",
    dir: "ltr",
    title: "Calculadora de cimento",
    description: "Calculadora de cimento para dosar argamassa e concreto por peso em kg.",
    heroEyebrow: "Argamassa e concreto",
    heroTitle: "Receita por peso",
    heroIntro: "Introduza os kg de cimento, escolha a mistura e a resistencia. Calculamos areia, pedra e agua para dosagem com balanca.",
    cement: "Cimento",
    inKg: "Em kg",
    adjustCement: "Ajustar cimento",
    subtractKg: "Subtrair 1 kg",
    addKg: "Adicionar 1 kg",
    cementKg: "Quilogramas de cimento",
    presets: "Quantidades frequentes",
    mix: "Mistura",
    mortar: "Argamassa",
    concrete: "Concreto",
    strength: "Resistencia",
    strong: "Forte",
    medium: "Media",
    low: "Baixa",
    ratio: "Peso",
    recipeStrength: { strong: "forte", medium: "media", low: "baixa" },
    material: { cement: "Cimento", sand: "Areia", stone: "Pedra", water: "Agua", total: "Areia + pedra" },
    waterUnit: "kg / litros",
    noteConcrete: "Dosagem por peso para balanca: {cement} kg de cimento, {sand} kg de areia e {stone} kg de pedra.",
    noteMortar: "Dosagem por peso para balanca: {cement} kg de cimento e {sand} kg de areia.",
    warning: "Dosagem pensada para balanca. A agua e pesada ou medida em litros e ajustada aos poucos conforme a humidade da areia, granulometria e consistencia necessaria.",
    invalidCement: "Os kg de cimento devem ser maiores que zero.",
    invalidMix: "Tipo de mistura invalido.",
    invalidRecipe: "Tipo de receita invalido.",
    checkData: "Revise os dados",
    notCalculable: "Nao e possivel calcular",
  },
  zh: {
    htmlLang: "zh",
    dir: "ltr",
    title: "水泥计算器",
    description: "按重量计算砂浆和混凝土配比的水泥计算器，单位为千克。",
    heroEyebrow: "砂浆和混凝土",
    heroTitle: "按重量配方",
    heroIntro: "输入水泥千克数，选择混合类型和强度。我们会计算称重配料所需的砂、石子和水。",
    cement: "水泥",
    inKg: "千克",
    adjustCement: "调整水泥",
    subtractKg: "减少 1 千克",
    addKg: "增加 1 千克",
    cementKg: "水泥千克数",
    presets: "常用数量",
    mix: "混合类型",
    mortar: "砂浆",
    concrete: "混凝土",
    strength: "强度",
    strong: "高",
    medium: "中",
    low: "低",
    ratio: "重量",
    recipeStrength: { strong: "高强度", medium: "中等强度", low: "低强度" },
    material: { cement: "水泥", sand: "砂", stone: "石子", water: "水", total: "砂 + 石子" },
    waterUnit: "千克 / 升",
    noteConcrete: "按重量称重配料：{cement} 千克水泥、{sand} 千克砂和 {stone} 千克石子。",
    noteMortar: "按重量称重配料：{cement} 千克水泥和 {sand} 千克砂。",
    warning: "该配比适合使用秤称量。水按重量或升数计量，并根据砂的湿度、骨料粒径和所需稠度逐步调整。",
    invalidCement: "水泥千克数必须大于零。",
    invalidMix: "混合类型无效。",
    invalidRecipe: "配方类型无效。",
    checkData: "检查数据",
    notCalculable: "无法计算",
  },
  hi: {
    htmlLang: "hi",
    dir: "ltr",
    title: "सीमेंट कैलकुलेटर",
    description: "मोर्टार और कंक्रीट मिश्रण को वजन के आधार पर kg में मापने के लिए सीमेंट कैलकुलेटर।",
    heroEyebrow: "मोर्टार और कंक्रीट",
    heroTitle: "वजन के अनुसार नुस्खा",
    heroIntro: "सीमेंट के kg दर्ज करें, मिश्रण और मजबूती चुनें। हम तराजू से मापने के लिए रेत, पत्थर और पानी की गणना करेंगे।",
    cement: "सीमेंट",
    inKg: "kg में",
    adjustCement: "सीमेंट समायोजित करें",
    subtractKg: "1 kg घटाएं",
    addKg: "1 kg जोड़ें",
    cementKg: "सीमेंट के किलोग्राम",
    presets: "सामान्य मात्राएं",
    mix: "मिश्रण",
    mortar: "मोर्टार",
    concrete: "कंक्रीट",
    strength: "मजबूती",
    strong: "मजबूत",
    medium: "मध्यम",
    low: "कम",
    ratio: "वजन",
    recipeStrength: { strong: "मजबूत", medium: "मध्यम", low: "कम" },
    material: { cement: "सीमेंट", sand: "रेत", stone: "पत्थर", water: "पानी", total: "रेत + पत्थर" },
    waterUnit: "kg / लीटर",
    noteConcrete: "तराजू के लिए वजन से मात्रा: {cement} kg सीमेंट, {sand} kg रेत और {stone} kg पत्थर।",
    noteMortar: "तराजू के लिए वजन से मात्रा: {cement} kg सीमेंट और {sand} kg रेत।",
    warning: "यह मात्रा तराजू के लिए है। पानी को वजन या लीटर में मापा जाता है और रेत की नमी, दानेदार आकार और आवश्यक गाढ़ेपन के अनुसार धीरे-धीरे समायोजित किया जाता है।",
    invalidCement: "सीमेंट kg शून्य से अधिक होना चाहिए।",
    invalidMix: "मिश्रण प्रकार अमान्य है।",
    invalidRecipe: "नुस्खा प्रकार अमान्य है।",
    checkData: "डेटा जांचें",
    notCalculable: "गणना नहीं हो सकती",
  },
  ar: {
    htmlLang: "ar",
    dir: "rtl",
    title: "حاسبة الأسمنت",
    description: "حاسبة أسمنت لتحديد نسب الملاط والخرسانة بالوزن بالكيلوغرام.",
    heroEyebrow: "ملاط وخرسانة",
    heroTitle: "وصفة بالوزن",
    heroIntro: "أدخل كيلوجرامات الأسمنت، واختر نوع الخلطة والمقاومة. سنحسب الرمل والحصى والماء للقياس بالميزان.",
    cement: "أسمنت",
    inKg: "بالكيلوغرام",
    adjustCement: "تعديل الأسمنت",
    subtractKg: "طرح 1 كجم",
    addKg: "إضافة 1 كجم",
    cementKg: "كيلوجرامات الأسمنت",
    presets: "كميات شائعة",
    mix: "الخلطة",
    mortar: "ملاط",
    concrete: "خرسانة",
    strength: "المقاومة",
    strong: "قوية",
    medium: "متوسطة",
    low: "منخفضة",
    ratio: "الوزن",
    recipeStrength: { strong: "قوي", medium: "متوسط", low: "منخفض" },
    material: { cement: "أسمنت", sand: "رمل", stone: "حصى", water: "ماء", total: "رمل + حصى" },
    waterUnit: "كجم / لتر",
    noteConcrete: "نسب بالوزن للميزان: {cement} كجم أسمنت، {sand} كجم رمل و {stone} كجم حصى.",
    noteMortar: "نسب بالوزن للميزان: {cement} كجم أسمنت و {sand} كجم رمل.",
    warning: "هذه النسب مخصصة للميزان. يوزن الماء أو يقاس باللتر ويعدل تدريجيا حسب رطوبة الرمل وحجم الحبيبات والقوام المطلوب.",
    invalidCement: "يجب أن تكون كيلوجرامات الأسمنت أكبر من صفر.",
    invalidMix: "نوع الخلطة غير صالح.",
    invalidRecipe: "نوع الوصفة غير صالح.",
    checkData: "راجع البيانات",
    notCalculable: "لا يمكن الحساب",
  },
  bn: {
    htmlLang: "bn",
    dir: "ltr",
    title: "সিমেন্ট ক্যালকুলেটর",
    description: "ওজন অনুযায়ী kg-এ মর্টার ও কংক্রিটের মিশ্রণ হিসাব করার সিমেন্ট ক্যালকুলেটর।",
    heroEyebrow: "মর্টার ও কংক্রিট",
    heroTitle: "ওজন অনুযায়ী রেসিপি",
    heroIntro: "সিমেন্টের kg লিখুন, মিশ্রণ ও শক্তি নির্বাচন করুন। আমরা ওজন মাপার জন্য বালি, পাথর ও পানি হিসাব করব।",
    cement: "সিমেন্ট",
    inKg: "kg-এ",
    adjustCement: "সিমেন্ট সমন্বয় করুন",
    subtractKg: "১ kg কমান",
    addKg: "১ kg বাড়ান",
    cementKg: "সিমেন্টের কিলোগ্রাম",
    presets: "সাধারণ পরিমাণ",
    mix: "মিশ্রণ",
    mortar: "মর্টার",
    concrete: "কংক্রিট",
    strength: "শক্তি",
    strong: "শক্তিশালী",
    medium: "মাঝারি",
    low: "কম",
    ratio: "ওজন",
    recipeStrength: { strong: "শক্তিশালী", medium: "মাঝারি", low: "কম" },
    material: { cement: "সিমেন্ট", sand: "বালি", stone: "পাথর", water: "পানি", total: "বালি + পাথর" },
    waterUnit: "kg / লিটার",
    noteConcrete: "ওজন মাপার জন্য অনুপাত: {cement} kg সিমেন্ট, {sand} kg বালি এবং {stone} kg পাথর।",
    noteMortar: "ওজন মাপার জন্য অনুপাত: {cement} kg সিমেন্ট এবং {sand} kg বালি।",
    warning: "এই মাপ ওজনের জন্য তৈরি। পানি ওজন বা লিটারে মাপা হয় এবং বালির আর্দ্রতা, দানার আকার ও দরকারি ঘনত্ব অনুযায়ী ধীরে ধীরে সমন্বয় করা হয়।",
    invalidCement: "সিমেন্ট kg শূন্যের বেশি হতে হবে।",
    invalidMix: "মিশ্রণের ধরন সঠিক নয়।",
    invalidRecipe: "রেসিপির ধরন সঠিক নয়।",
    checkData: "ডেটা পরীক্ষা করুন",
    notCalculable: "হিসাব করা যাচ্ছে না",
  },
  ru: {
    htmlLang: "ru",
    dir: "ltr",
    title: "Калькулятор цемента",
    description: "Калькулятор цемента для расчета раствора и бетона по весу в кг.",
    heroEyebrow: "Раствор и бетон",
    heroTitle: "Рецепт по весу",
    heroIntro: "Введите кг цемента, выберите смесь и прочность. Мы рассчитаем песок, щебень и воду для дозирования на весах.",
    cement: "Цемент",
    inKg: "В кг",
    adjustCement: "Изменить цемент",
    subtractKg: "Уменьшить на 1 кг",
    addKg: "Добавить 1 кг",
    cementKg: "Килограммы цемента",
    presets: "Частые количества",
    mix: "Смесь",
    mortar: "Раствор",
    concrete: "Бетон",
    strength: "Прочность",
    strong: "Высокая",
    medium: "Средняя",
    low: "Низкая",
    ratio: "Вес",
    recipeStrength: { strong: "высокой прочности", medium: "средней прочности", low: "низкой прочности" },
    material: { cement: "Цемент", sand: "Песок", stone: "Щебень", water: "Вода", total: "Песок + щебень" },
    waterUnit: "кг / литры",
    noteConcrete: "Дозировка по весу для весов: {cement} кг цемента, {sand} кг песка и {stone} кг щебня.",
    noteMortar: "Дозировка по весу для весов: {cement} кг цемента и {sand} кг песка.",
    warning: "Дозировка рассчитана для весов. Воду взвешивают или измеряют в литрах и постепенно корректируют по влажности песка, фракции заполнителя и нужной консистенции.",
    invalidCement: "Количество цемента в кг должно быть больше нуля.",
    invalidMix: "Недопустимый тип смеси.",
    invalidRecipe: "Недопустимый тип рецепта.",
    checkData: "Проверьте данные",
    notCalculable: "Невозможно рассчитать",
  },
  ja: {
    htmlLang: "ja",
    dir: "ltr",
    title: "セメント計算機",
    description: "モルタルとコンクリートの配合を重量 kg で計算するセメント計算機。",
    heroEyebrow: "モルタルとコンクリート",
    heroTitle: "重量配合",
    heroIntro: "セメントの kg、配合、強度を入力してください。はかりで使う砂、石、水を計算します。",
    cement: "セメント",
    inKg: "kg",
    adjustCement: "セメントを調整",
    subtractKg: "1 kg 減らす",
    addKg: "1 kg 増やす",
    cementKg: "セメントのキログラム",
    presets: "よく使う量",
    mix: "配合",
    mortar: "モルタル",
    concrete: "コンクリート",
    strength: "強度",
    strong: "強い",
    medium: "中",
    low: "低い",
    ratio: "重量",
    recipeStrength: { strong: "強配合", medium: "中配合", low: "低配合" },
    material: { cement: "セメント", sand: "砂", stone: "石", water: "水", total: "砂 + 石" },
    waterUnit: "kg / リットル",
    noteConcrete: "はかり用の重量配合: セメント {cement} kg、砂 {sand} kg、石 {stone} kg。",
    noteMortar: "はかり用の重量配合: セメント {cement} kg、砂 {sand} kg。",
    warning: "この配合ははかりでの計量向けです。水は重量またはリットルで量り、砂の湿り具合、粒度、必要な硬さに合わせて少しずつ調整します。",
    invalidCement: "セメント kg は 0 より大きくしてください。",
    invalidMix: "配合タイプが無効です。",
    invalidRecipe: "レシピタイプが無効です。",
    checkData: "データを確認",
    notCalculable: "計算できません",
  },
  de: {
    htmlLang: "de",
    dir: "ltr",
    title: "Zementrechner",
    description: "Zementrechner zum Dosieren von Mortel und Beton nach Gewicht in kg.",
    heroEyebrow: "Mortel und Beton",
    heroTitle: "Rezept nach Gewicht",
    heroIntro: "Geben Sie die kg Zement ein und waehlen Sie Mischung und Festigkeit. Wir berechnen Sand, Stein und Wasser fuer die Dosierung mit der Waage.",
    cement: "Zement",
    inKg: "In kg",
    adjustCement: "Zement anpassen",
    subtractKg: "1 kg abziehen",
    addKg: "1 kg hinzufuegen",
    cementKg: "Kilogramm Zement",
    presets: "Haeufige Mengen",
    mix: "Mischung",
    mortar: "Mortel",
    concrete: "Beton",
    strength: "Festigkeit",
    strong: "Stark",
    medium: "Mittel",
    low: "Niedrig",
    ratio: "Gewicht",
    recipeStrength: { strong: "stark", medium: "mittel", low: "niedrig" },
    material: { cement: "Zement", sand: "Sand", stone: "Stein", water: "Wasser", total: "Sand + Stein" },
    waterUnit: "kg / Liter",
    noteConcrete: "Dosierung nach Gewicht fuer die Waage: {cement} kg Zement, {sand} kg Sand und {stone} kg Stein.",
    noteMortar: "Dosierung nach Gewicht fuer die Waage: {cement} kg Zement und {sand} kg Sand.",
    warning: "Die Dosierung ist fuer eine Waage gedacht. Wasser wird gewogen oder in Litern gemessen und je nach Sandfeuchte, Koernung und gewuenschter Konsistenz schrittweise angepasst.",
    invalidCement: "Die kg Zement muessen groesser als null sein.",
    invalidMix: "Ungueltiger Mischungstyp.",
    invalidRecipe: "Ungueltiger Rezepttyp.",
    checkData: "Daten pruefen",
    notCalculable: "Berechnung nicht moeglich",
  },
  id: {
    htmlLang: "id",
    dir: "ltr",
    title: "Kalkulator semen",
    description: "Kalkulator semen untuk menakar mortar dan beton berdasarkan berat dalam kg.",
    heroEyebrow: "Mortar dan beton",
    heroTitle: "Resep berdasarkan berat",
    heroIntro: "Masukkan kg semen, pilih campuran dan kekuatan. Kami menghitung pasir, batu, dan air untuk penakaran dengan timbangan.",
    cement: "Semen",
    inKg: "Dalam kg",
    adjustCement: "Atur semen",
    subtractKg: "Kurangi 1 kg",
    addKg: "Tambah 1 kg",
    cementKg: "Kilogram semen",
    presets: "Jumlah umum",
    mix: "Campuran",
    mortar: "Mortar",
    concrete: "Beton",
    strength: "Kekuatan",
    strong: "Kuat",
    medium: "Sedang",
    low: "Rendah",
    ratio: "Berat",
    recipeStrength: { strong: "kuat", medium: "sedang", low: "rendah" },
    material: { cement: "Semen", sand: "Pasir", stone: "Batu", water: "Air", total: "Pasir + batu" },
    waterUnit: "kg / liter",
    noteConcrete: "Takaran berdasarkan berat untuk timbangan: {cement} kg semen, {sand} kg pasir dan {stone} kg batu.",
    noteMortar: "Takaran berdasarkan berat untuk timbangan: {cement} kg semen dan {sand} kg pasir.",
    warning: "Takaran ini dirancang untuk timbangan. Air ditimbang atau diukur dalam liter dan disesuaikan bertahap menurut kelembapan pasir, ukuran agregat, dan konsistensi yang dibutuhkan.",
    invalidCement: "Kg semen harus lebih besar dari nol.",
    invalidMix: "Jenis campuran tidak valid.",
    invalidRecipe: "Jenis resep tidak valid.",
    checkData: "Periksa data",
    notCalculable: "Tidak dapat menghitung",
  },
};

let currentLanguage = DEFAULT_LANGUAGE;

function roundAmount(value) {
  return Math.round(value * 10) / 10;
}

function formatRatio(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function getTexts(language = currentLanguage) {
  return TEXTS[language] || TEXTS[DEFAULT_LANGUAGE];
}

function detectLanguage(languages) {
  const browserLanguages = languages && languages.length ? languages : [DEFAULT_LANGUAGE];
  const found = browserLanguages
    .map((language) => String(language).toLowerCase().split("-")[0])
    .find((language) => SUPPORTED_LANGUAGES.includes(language));

  return found || DEFAULT_LANGUAGE;
}

function fillTemplate(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key]);
}

function calculateRecipe(cementKg, mixKind, strength, language = currentLanguage) {
  const text = getTexts(language);
  const cement = Number(cementKg);
  const mix = RECIPES[mixKind];

  if (!Number.isFinite(cement) || cement <= 0) {
    throw new Error(text.invalidCement);
  }

  if (!mix) {
    throw new Error(text.invalidMix);
  }

  const ratio = mix.strengths[strength];

  if (!ratio) {
    throw new Error(text.invalidRecipe);
  }

  const sand = cement * ratio.sand;
  const stone = ratio.stone ? cement * ratio.stone : 0;

  const result = {
    title: `${text[mixKind]} ${text.recipeStrength[strength]}`,
    ratioText: buildRatioText(ratio, text),
    note: buildNote(mixKind, ratio, text),
    materials: [
      { kind: "cement", name: text.material.cement, amount: roundAmount(cement), unit: "kg" },
      { kind: "sand", name: text.material.sand, amount: roundAmount(sand), unit: "kg" },
      { kind: "water", name: text.material.water, amount: roundAmount(cement * ratio.waterRatio), unit: text.waterUnit },
    ],
  };

  if (ratio.stone) {
    result.materials.splice(2, 0, { kind: "stone", name: text.material.stone, amount: roundAmount(stone), unit: "kg" });
    result.materials.push({
      kind: "total",
      name: text.material.total,
      amount: roundAmount(sand + stone),
      unit: "kg",
    });
  }

  return result;
}

function buildRatioText(ratio, text = getTexts()) {
  return ratio.stone
    ? `${text.ratio} ${formatRatio(ratio.cement)}:${formatRatio(ratio.sand)}:${formatRatio(ratio.stone)}`
    : `${text.ratio} ${formatRatio(ratio.cement)}:${formatRatio(ratio.sand)}`;
}

function buildNote(mixKind, ratio, text = getTexts()) {
  const values = {
    cement: formatRatio(ratio.cement),
    sand: formatRatio(ratio.sand),
    stone: ratio.stone ? formatRatio(ratio.stone) : "",
  };

  if (mixKind === "concrete") {
    return fillTemplate(text.noteConcrete, values);
  }

  return fillTemplate(text.noteMortar, values);
}

function createMaterialCard(material) {
  return `
    <li class="material" data-kind="${material.kind}">
      <span class="name">${material.name}</span>
      <span class="value">${material.amount}<span class="unit">${material.unit}</span></span>
    </li>
  `;
}

function getSelection() {
  const cementInput = document.querySelector("#cement-kg");
  const mix = document.querySelector('input[name="mixKind"]:checked');
  const strength = document.querySelector('input[name="strength"]:checked');

  return {
    cementKg: cementInput ? cementInput.value : "",
    mixKind: mix ? mix.value : "mortar",
    strength: strength ? strength.value : "medium",
  };
}

function updatePresets(value) {
  const normalized = String(value).replace(/^0+(\d)/, "$1");
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.dataset.active = chip.dataset.preset === normalized ? "true" : "false";
  });
}

function renderRecipe() {
  const { cementKg, mixKind, strength } = getSelection();
  const cards = document.querySelector("#recipe-cards");
  const title = document.querySelector("#recipe-title");
  const ratio = document.querySelector("#recipe-ratio");
  const note = document.querySelector("#recipe-note");
  const text = getTexts();

  try {
    const recipe = calculateRecipe(cementKg, mixKind, strength);

    title.textContent = recipe.title;
    ratio.textContent = recipe.ratioText;
    note.textContent = recipe.note;
    cards.innerHTML = recipe.materials.map(createMaterialCard).join("");
  } catch (error) {
    title.textContent = text.checkData;
    ratio.textContent = text.notCalculable;
    note.textContent = error.message;
    cards.innerHTML = "";
  }

  updatePresets(cementKg);
}

function applyText(language) {
  currentLanguage = language;
  const text = getTexts(language);

  document.documentElement.lang = text.htmlLang;
  document.documentElement.dir = text.dir;
  document.title = text.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = text.description;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (text[key]) node.textContent = text[key];
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
    node.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attr, key] = pair.split(":");
      if (attr && key && text[key]) node.setAttribute(attr, text[key]);
    });
  });

  renderStructuredData(text);
}

function renderStructuredData(text) {
  const node = document.querySelector("#structured-data");
  if (!node) return;

  node.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: text.title,
    description: text.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    url: "https://cemento.pedromartinezweb.com/",
    inLanguage: text.htmlLang,
    isAccessibleForFree: true,
  });
}

function saveSelection() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getSelection()));
  } catch (e) {}
}

function loadSelection() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const selection = JSON.parse(saved);

    if (selection.cementKg) {
      const input = document.querySelector("#cement-kg");
      if (input) input.value = selection.cementKg;
    }

    if (selection.mixKind) {
      const radio = document.querySelector(`input[name="mixKind"][value="${selection.mixKind}"]`);
      if (radio) radio.checked = true;
    }

    if (selection.strength) {
      const radio = document.querySelector(`input[name="strength"][value="${selection.strength}"]`);
      if (radio) radio.checked = true;
    }
  } catch (e) {}
}

function normalizeCement(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return 0.5;
  return Math.round(parsed * 10) / 10;
}

function handleStep(delta) {
  const input = document.querySelector("#cement-kg");
  if (!input) return;

  const current = Number(input.value) || 0;
  const next = Math.max(0.5, current + delta);
  input.value = Number.isInteger(next) ? String(next) : next.toFixed(1);
  renderRecipe();
  saveSelection();
}

function handlePreset(value) {
  const input = document.querySelector("#cement-kg");
  if (!input) return;

  input.value = value;
  renderRecipe();
  saveSelection();
}

if (typeof document !== "undefined") {
  const form = document.querySelector("#recipe-form");
  const language = detectLanguage(navigator.languages || [navigator.language]);

  applyText(language);
  loadSelection();

  form.addEventListener("input", () => {
    renderRecipe();
    saveSelection();
  });
  form.addEventListener("change", () => {
    renderRecipe();
    saveSelection();
  });

  form.querySelectorAll("[data-step]").forEach((btn) => {
    btn.addEventListener("click", () => handleStep(Number(btn.dataset.step)));
  });

  form.querySelectorAll("[data-preset]").forEach((btn) => {
    btn.addEventListener("click", () => handlePreset(btn.dataset.preset));
  });

  const cementInput = document.querySelector("#cement-kg");
  if (cementInput) {
    cementInput.addEventListener("blur", () => {
      const next = normalizeCement(cementInput.value);
      cementInput.value = Number.isInteger(next) ? String(next) : next.toFixed(1);
      renderRecipe();
      saveSelection();
    });
  }

  renderRecipe();
}

if (typeof module !== "undefined") {
  module.exports = { calculateRecipe, detectLanguage };
}
