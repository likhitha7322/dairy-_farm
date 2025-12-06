// src/lang/translations.js

export const translations = {
  /* ---------------- ENGLISH ---------------- */
  en: {
    // Common / Layout
    appTitle: "Smart Dairy Farm",
    dairyFarmManagement: "Dairy Farm Management",
    menu: "Menu",
    home: "Home",
    dashboard: "Dashboard",
    record: "Record",
    chat: "Chat",
    voice: "Voice",
    profile: "Profile",
    logout: "Logout",
    selectLanguage: "Language",
    close: "Close",
    tips: "Tips",
    listening: "Listening...",
    farmer: "Farmer",
    youSaid: "You said",

    welcome: "Welcome",
    loading: "Loading...",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    deleteShort: "Del",
    actions: "Actions",
    cancel: "Cancel",
    yes: "Yes",
    no: "No",
    unnamed: "Unnamed",
    notAvailable: "N/A",

    // Navigation
    navDashboard: "Dashboard",
    navCattleList: "Cattle List",
    navRegisterCattle: "Register Cattle",
    navMilkFeed: "Milk & Feed",
    navHealth: "Health",
    navBreeding: "Breeding",
    navFarmingTips: "Farming Tips",
    navProfile: "Profile",
    navLanguage: "Language",

    /* --------- DASHBOARD --------- */
    dashboardTitle: "Dashboard",
    dashboardSubtitle: "Daily farm overview",
    totalCattle: "Total Cattle",
    milkToday: "Milk Today",
    profitToday: "Profit Today",
    weeklyMilkTrend: "Weekly Milk Trend",
    chartComingSoon: "Chart coming soon",
    failedToLoadDashboard: "Failed to load dashboard",

    /* --------- RECORD MENU --------- */
    recordMenuTitle: "Record Menu",
    recordMenuSubtitle: "Manage daily farm records",
    recordMilkFeed: "Milk & Feed Records",
    recordHealth: "Health Records",
    recordBreeding: "Breeding Records",
    recordExpenses: "Expenses",

    /* --------- CATTLE LIST --------- */
    cattleListTitle: "Cattle List",
    backToCattleList: "Back to Cattle List",
    addCattle: "Add Cattle",
    failedToLoad: "Failed to load",
    deleteCattleConfirm: "Delete this cattle record?",

    /* --------- CATTLE DETAILS --------- */
    cattleNotFound: "Cattle not found",
    downloadCsv: "Download CSV",
    printProfile: "Print Profile",

    breed: "Breed",
    dob: "Date of Birth",
    status: "Status",

    avgMilk: "Avg Milk",
    pregnancy: "Pregnancy",
    lastBreeding: "Last Breeding",
    age: "Age",

    totalMilk: "Total Milk",
    milkIncome: "Milk Income",
    feedCost: "Feed Cost",
    profit: "Profit",
    avgMilkPerDay: "Avg Milk / Day",

    milkRecord: "Milk Record",
    feedRecord: "Feed Record",
    openMilkFeedPage: "Open Milk / Feed Page",
    noMilkFeedRecords: "No milk or feed records for this cattle yet.",

    milkYieldChartTitle: "Daily Milk Yield (L)",
    dailyProfitChartTitle: "Daily Profit (₹)",

    date: "Date",
    morningLitres: "Morning (L)",
    eveningLitres: "Evening (L)",
    totalLitres: "Total (L)",
    milkPricePerLitre: "Milk Price (₹/L)",
    feedType: "Feed Type",
    qtyKg: "Qty (kg)",
    feedCostLabel: "Feed Cost",

    breedingHistoryTitle: "Breeding History",
    noBreedingRecords: "No breeding records for this cattle yet.",
    serviceDate: "Service Date",
    method: "Method",
    pregnancyStatus: "Pregnancy Status",
    expectedCalving: "Expected Calving",
    actualCalving: "Actual Calving",
    remarks: "Remarks",

    healthRecordsTitle: "Health Records",
    noHealthRecords: "No health records for this cattle yet.",
    recordedOn: "Recorded On",
    vaccination: "Vaccination",
    next: "Next",
    deworming: "Deworming",
    illness: "Illness",
    since: "since",
    severity: "Severity",
    illnessRemarks: "Illness Remarks",
    checkupDate: "Checkup Date",
    checkupRemarks: "Checkup Remarks",

    /* --------- MILK & FEED PAGE --------- */
    dairyFarmManagementTitle: "Dairy Farm Management",
    milkFeedRecordsTitle: "Milk / Feed Records",

    failedToLoadCattle: "Failed to load cattle",
    failedToLoadRecords: "Failed to load records",
    failedToSaveMilkFeed: "Failed to save milk / feed record",
    serverErrorMilkFeed: "Server error while saving",
    deleteFailedMilkFeed: "Delete failed",

    voiceNotSupported: "Voice input not supported in this browser",
    confirmDeleteRecord: "Delete this record?",
    pleaseSelectCattleAndDate: "Please select cattle and date",

    selectCattleLabel: "Select Cattle",
    milkPriceLabel: "Milk Price (₹ / Litre)",
    quantityKgPerDay: "Quantity (kg / day)",
    costPerKg: "Cost per kg (₹)",
    dailyFeedCost: "Daily Feed Cost (₹)",
    morningYield: "Morning Yield (L)",
    eveningYield: "Evening Yield (L)",
    totalYield: "Total Yield (L)",
    runningCostLabel: "Other Running Costs (₹ / day)",
    earningsPerDay: "Earnings (₹ / day)",

    saving: "Saving...",
    updating: "Updating...",
    saveRecordBtn: "💾 Save Record",
    updateRecordBtn: "✏ Update Record",
    cancelEdit: "✖ Cancel Edit",

    savedRecordsTitle: "Saved Records",
    selectedCattleSuffix: "Selected Cattle",
    loadingRecords: "Loading records...",
    cattleColumn: "Cattle",
    qtyKgPerDayColumn: "Qty (kg/day)",
    costPerKgColumn: "Cost/kg (₹)",
    feedCostColumn: "Feed Cost (₹)",
    milkPriceColumn: "Milk Price (₹/L)",
    totalYieldColumn: "Total Yield (L)",
    earningsColumn: "Earnings (₹/day)",
    noRecordsForThisCattle: "No records yet for this cattle.",

    /* --------- HEALTH RECORD PAGE --------- */
    healthRecordTitle: "Health Record",
    failedToLoadCattleList: "Failed to load cattle list",
    pleaseSelectCattle: "Please select a cattle.",
    healthRecordSaved: "Health record saved.",

    vaccinationSection: "Vaccination",
    dewormingSection: "Deworming",
    illnessSection: "Illness",
    checkupSection: "Checkup",

    vaccinationDate: "Vaccination Date",
    nextVaccinationDate: "Next Due",
    dewormingDate: "Deworming Date",
    nextDewormingDate: "Next Due",
    illnessType: "Type",
    illnessOnsetDate: "Onset Date",
    severityLabel: "Severity",
    severityMild: "Mild",
    severityModerate: "Moderate",
    severitySevere: "Severe",
    illnessRemarksLabel: "Additional remarks",
    checkupDateLabel: "Checkup Date",
    checkupRemarksLabel: "Checkup remarks",
    saveHealthRecordBtn: "Save Health Record",
    savingHealthRecord: "Saving...",

    /* --------- BREEDING RECORD PAGE --------- */
    failedToLoadBreedingRecords: "Failed to load breeding records",
    failedToSaveBreedingRecord: "Failed to save breeding record",
    failedToDeleteBreeding: "Failed to delete breeding record",
    errorDeletingBreeding: "Error deleting breeding record",
    serverError: "Server error",
    selectCattleAndServiceDate: "Please select cattle and service date.",

    breedingRecordsTitle: "Breeding Records",
    editBreedingRecordTitle: "Edit Breeding Record",
    addBreedingRecordTitle: "Add Breeding Record",
    cattleLabel: "Cattle",
    selectCattle: "Select Cattle",
    selectPlaceholder: "Select",
    methodAI: "Artificial Insemination (AI)",
    methodNatural: "Natural Service",
    methodOther: "Other",

    pregStatusNotChecked: "Not Checked",
    pregStatusInseminated: "Inseminated",
    pregStatusPregnant: "Pregnant",
    pregStatusNotPregnant: "Not Pregnant",
    pregStatusAborted: "Aborted",
    pregStatusDelivered: "Delivered",

    expectedCalvingDate: "Expected Calving Date",
    expectedCalvingHint: "Auto-filled only when status is Pregnant.",
    remarksPlaceholder: "Any vet notes, heat behaviour, AI details, etc.",
    updatingBreeding: "Updating...",
    savingBreeding: "Saving...",
    updateBreedingBtn: "Update Breeding Record",
    saveBreedingBtn: "Save Breeding Record",
    selectCattleToViewBreeding:
      "Select a cattle above to view its breeding records.",
    noBreedingRecordsForCattle:
      "No breeding records for this cattle yet.",
    editRecordTitle: "Edit Record",
    deleteRecordTitle: "Delete Record",

    /* --------- PROFILE PAGE --------- */
    noUserInfoFound: "No user information found.",
    farmerProfileTitle: "Farmer Profile",
    farmerProfileSubtitle: "Manage your personal and farm details easily",
    tapToUploadPhoto: "Tap to upload photo",
    profileNameLabel: "Name:",
    profilePhoneLabel: "Phone:",
    profilePasswordLabel: "Password:",
    changePasswordLabel: "Change Password:",
    pleaseEnterNewPassword: "Please enter a new password.",
    passwordUpdatedSuccess: "✅ Password updated successfully!",
    enterNewPasswordPlaceholder: "Enter new password",
    updateButton: "Update",
    totalCattleManagedTitle: "Total Cattle Managed",
    suggestionTitle: "Suggestion",
    suggestionBody:
      "Maintaining updated records ensures better management and tracking of your dairy performance. Regularly check your cattle health and feeding details.",
  },

  /* ---------------- KANNADA ---------------- */
  kn: {
    appTitle: "ಸ್ಮಾರ್ಟ್ ಡೈರಿ ಫಾರ್ಮ್",

    dairyFarmManagement: "ಡೈರಿ ಫಾರ್ಮ್ ನಿರ್ವಹಣೆ",
    menu: "ಮೆನು",
    home: "ಮುಖಪುಟ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    record: "ರೆಕಾರ್ಡ್",
    chat: "ಚಾಟ್",
    voice: "ವಾಯ್ಸ್",
    profile: "ಪ್ರೊಫೈಲ್",
    logout: "ಲಾಗ್‌ಔಟ್",
    selectLanguage: "ಭಾಷೆ",
    close: "ಮುಚ್ಚಿ",
    tips: "ಟಿಪ್ಸ್",
    listening: "ಕೆಲಸ ಮಾಡುತ್ತಿದೆ...",
    farmer: "ರೈತ",
    youSaid: "ನೀವು ಹೇಳಿದರು",

    welcome: "ಸ್ವಾಗತ",
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    save: "ಸೇವ್",
    edit: "ತಿದ್ದು",
    delete: "ಅಳಿಸು",
    deleteShort: "ಅಳಿಸು",
    actions: "ಕ್ರಿಯೆಗಳು",
    cancel: "ರದ್ದು",
    yes: "ಹೌದು",
    no: "ಇಲ್ಲ",
    unnamed: "ಹೆಸರಿಲ್ಲ",
    notAvailable: "ಲಭ್ಯವಿಲ್ಲ",

    navDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    navCattleList: "ಜಾನುವಾರುಗಳ ಪಟ್ಟಿ",
    navRegisterCattle: "ಜಾನುವಾರು ನೋಂದಣಿ",
    navMilkFeed: "ಹಾಲು / ಆಹಾರ",
    navHealth: "ಆರೋಗ್ಯ",
    navBreeding: "ಬೀಜನ",
    navFarmingTips: "ಕೃಷಿ ಸಲಹೆಗಳು",
    navProfile: "ಪ್ರೊಫೈಲ್",
    navLanguage: "ಭಾಷೆ",

    /* --------- DASHBOARD --------- */
    dashboardTitle: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    dashboardSubtitle: "ದೈನಂದಿನ ಫಾರ್ಮ್ ಮಾಹಿತಿ",
    totalCattle: "ಒಟ್ಟು ಜನಾವರ",
    milkToday: "ಇಂದಿನ ಹಾಲು",
    profitToday: "ಇಂದಿನ ಲಾಭ",
    weeklyMilkTrend: "ವಾರದ ಹಾಲು ಉತ್ಪಾದನೆ",
    chartComingSoon: "ಚಾರ್ಟ್ ಸದ್ಯದಲ್ಲೇ",
    failedToLoadDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಲೋಡ್ ವಿಫಲವಾಯಿತು",

    /* --------- RECORD MENU --------- */
    recordMenuTitle: "ರೆಕಾರ್ಡ್ ಮೆನು",
    recordMenuSubtitle: "ದೈನಂದಿನ ದಾಖಲೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    recordMilkFeed: "ಹಾಲು & ಆಹಾರ ದಾಖಲೆಗಳು",
    recordHealth: "ಆರೋಗ್ಯ ದಾಖಲೆಗಳು",
    recordBreeding: "ಬೀಜನ ದಾಖಲೆಗಳು",
    recordExpenses: "ಖರ್ಚುಗಳು",

    cattleListTitle: "ಜಾನುವಾರುಗಳ ಪಟ್ಟಿ",
    backToCattleList: "ಜಾನುವಾರುಗಳ ಪಟ್ಟಿಗೆ ಹಿಂತಿರುಗಿ",
    addCattle: "ಜಾನುವಾರು ಸೇರಿಸಿ",
    failedToLoad: "ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ",
    deleteCattleConfirm: "ಈ ಜಾನುವಾರು ದಾಖಲೆ ಅಳಿಸಬಹುದೇ?",

    cattleNotFound: "ಜಾನುವಾರು ಕಂಡುಬರಲಿಲ್ಲ",
    downloadCsv: "CSV ಡೌನ್‌ಲೋಡ್",
    printProfile: "ಪ್ರೊಫೈಲ್ ಪ್ರಿಂಟ್",

    breed: "ಜಾತಿ",
    dob: "ಹುಟ್ಟಿದ ದಿನಾಂಕ",
    status: " ಸ್ಥಿತಿ",

    avgMilk: "ಸರಾಸರಿ ಹಾಲು",
    pregnancy: "ಗರ್ಭಧಾರಣೆ",
    lastBreeding: "ಕೊನೆಯ ಬೀಜನ",
    age: "ವಯಸ್ಸು",

    totalMilk: "ಒಟ್ಟು ಹಾಲು",
    milkIncome: "ಹಾಲು ಆದಾಯ",
    feedCost: "ಆಹಾರ ವೆಚ್ಚ",
    profit: "ಲಾಭ",
    avgMilkPerDay: "ಪ್ರತಿದಿನ ಸರಾಸರಿ ಹಾಲು",

    milkRecord: "ಹಾಲು ದಾಖಲೆ",
    feedRecord: "ಆಹಾರ ದಾಖಲಾತಿ",
    openMilkFeedPage: "ಹಾಲು / ಆಹಾರ ಪುಟ ತೆರೆಯಿರಿ",
    noMilkFeedRecords: "ಈ ಜಾನುವಾರಿಗೆ ಇನ್ನೂ ಹಾಲು / ಆಹಾರ ದಾಖಲೆ ಇಲ್ಲ.",

    milkYieldChartTitle: "ಪ್ರತಿದಿನ ಹಾಲು (ಲೀ.)",
    dailyProfitChartTitle: "ದೈನಂದಿನ ಲಾಭ (₹)",

    date: "ದಿನಾಂಕ",
    morningLitres: "ಬೆಳಿಗ್ಗೆ (ಲೀ.)",
    eveningLitres: "ಸಂಜೆ (ಲೀ.)",
    totalLitres: "ಒಟ್ಟು (ಲೀ.)",
    milkPricePerLitre: "ಹಾಲಿನ ದರ (₹/ಲೀ.)",
    feedType: "ಆಹಾರದ ಪ್ರಕಾರ",
    qtyKg: "ಪ್ರಮಾಣ (ಕೆ.ಜಿ)",
    feedCostLabel: "ಆಹಾರ ವೆಚ್ಚ",

    breedingHistoryTitle: "ಬೀಜನ ಇತಿಹಾಸ",
    noBreedingRecords: "ಈ ಜಾನುವಾರಿಗೆ ಬೀಜನ ದಾಖಲೆ ಇಲ್ಲ.",
    serviceDate: "ಸೇವಾ ದಿನಾಂಕ",
    method: "ವಿಧಾನ",
    pregnancyStatus: "ಗರ್ಭಧಾರಣೆ ಸ್ಥಿತಿ",
    expectedCalving: "ನಿರೀಕ್ಷಿತ ಪ್ರಸವ",
    actualCalving: "ವಾಸ್ತವಿಕ ಪ್ರಸವ",
    remarks: "ಟಿಪ್ಪಣಿ",

    healthRecordsTitle: "ಆರೋಗ್ಯ ದಾಖಲೆಗಳು",
    noHealthRecords: "ಈ ಜಾನುವಾರಿಗೆ ಆರೋಗ್ಯ ದಾಖಲೆ ಇಲ್ಲ.",
    recordedOn: "ದಾಖಲಿಸಿದ ದಿನ",
    vaccination: "ಟೀಕೆ",
    next: "ಮುಂದಿನ",
    deworming: "ಹುಳು ನಿವಾರಣೆ",
    illness: "ರೋಗ",
    since: "ಇಂದಿನಿಂದ",
    severity: "ತೀವ್ರತೆ",
    illnessRemarks: "ರೋಗದ ಟಿಪ್ಪಣಿ",
    checkupDate: "ಪರಿಶೀಲನೆ ದಿನಾಂಕ",
    checkupRemarks: "ಪರಿಶೀಲನೆ ಟಿಪ್ಪಣಿ",

    dairyFarmManagementTitle: "ಡೈರಿ ಫಾರ್ಮ್ ನಿರ್ವಹಣೆ",
    milkFeedRecordsTitle: "ಹಾಲು / ಆಹಾರ ದಾಖಲೆಗಳು",

    failedToLoadCattle: "ಜಾನುವಾರುಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ",
    failedToLoadRecords: "ದಾಖಲೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ",
    failedToSaveMilkFeed:
      "ಹಾಲು / ಆಹಾರ ದಾಖಲಾತಿ ಉಳಿಸಲು ವಿಫಲವಾಗಿದೆ",
    serverErrorMilkFeed: "ಸರ್ವರ್ ದೋಷ, ನಂತರ ಪ್ರಯತ್ನಿಸಿ",
    deleteFailedMilkFeed: "ಅಳಿಸಲು ವಿಫಲವಾಗಿದೆ",

    voiceNotSupported: "ಈ ಬ್ರೌಸರ್ ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಸಪೋರ್ಟ್ ಇಲ್ಲ",
    confirmDeleteRecord: "ಈ ದಾಖಲೆಯನ್ನು ಅಳಿಸಬೇಕೇ?",
    pleaseSelectCattleAndDate:
      "ದಯವಿಟ್ಟು ಜಾನುವಾರು ಮತ್ತು ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ",

    selectCattleLabel: "ಜಾನುವಾರು ಆಯ್ಕೆಮಾಡಿ",
    milkPriceLabel: "ಹಾಲಿನ ದರ (₹ / ಲೀ.)",
    quantityKgPerDay: "ಪ್ರಮಾಣ (ಕೆ.ಜಿ / ದಿನ)",
    costPerKg: "ಪ್ರತಿ ಕೆ.ಜಿ ದರ (₹)",
    dailyFeedCost: "ದೈನಂದಿನ ಆಹಾರ ವೆಚ್ಚ (₹)",
    morningYield: "ಬೆಳಿಗ್ಗೆ ಹಾಲು (ಲೀ.)",
    eveningYield: "ಸಂಜೆ ಹಾಲು (ಲೀ.)",
    totalYield: "ಒಟ್ಟು ಹಾಲು (ಲೀ.)",
    runningCostLabel: "ಇತರೆ ದೈನಂದಿನ ವೆಚ್ಚ (₹)",
    earningsPerDay: "ಪ್ರತಿದಿನ ಲಾಭ (₹)",

    saving: "ಉಳಿಸಲಾಗುತ್ತಿದೆ...",
    updating: "ನವೀಕರಿಸಲಾಗುತ್ತಿದೆ...",
    saveRecordBtn: "💾 ದಾಖಲಾತಿ ಉಳಿಸಿ",
    updateRecordBtn: "✏ ದಾಖಲಾತಿ ನವೀಕರಿಸಿ",
    cancelEdit: "✖ ತಿದ್ದು ರದ್ದು",

    savedRecordsTitle: "ಉಳಿಸಿದ ದಾಖಲೆಗಳು",
    selectedCattleSuffix: "ಆಯ್ಕೆ ಮಾಡಿದ ಜಾನುವಾರು",
    loadingRecords: "ದಾಖಲೆಗಳು ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    cattleColumn: "ಜಾನುವಾರು",
    qtyKgPerDayColumn: "ಪ್ರಮಾಣ (ಕೆ.ಜಿ/ದಿನ)",
    costPerKgColumn: "ದರ/ಕೆ.ಜಿ (₹)",
    feedCostColumn: "ಆಹಾರ ವೆಚ್ಚ (₹)",
    milkPriceColumn: "ಹಾಲಿನ ದರ (₹/ಲೀ.)",
    totalYieldColumn: "ಒಟ್ಟು ಹಾಲು (ಲೀ.)",
    earningsColumn: "ಲಾಭ (₹/ದಿನ)",
    noRecordsForThisCattle: "ಈ ಜಾನುವಾರಿಗೆ ದಾಖಲೆ ಇಲ್ಲ.",

    healthRecordTitle: "ಆರೋಗ್ಯ ದಾಖಲೆ",
    failedToLoadCattleList:
      "ಜಾನುವಾರು ಪಟ್ಟಿಯನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ",
    pleaseSelectCattle: "ದಯವಿಟ್ಟು ಜಾನುವಾರು ಆಯ್ಕೆಮಾಡಿ.",
    healthRecordSaved: "ಆರೋಗ್ಯ ದಾಖಲೆ ಉಳಿಸಲಾಗಿದೆ.",

    vaccinationSection: "ಟೀಕೆ",
    dewormingSection: "ಹುಳು ನಿವಾರಣೆ",
    illnessSection: "ರೋಗ ಮಾಹಿತಿ",
    checkupSection: "ಪರಿಶೀಲನೆ",

    vaccinationDate: "ಟೀಕೆ ದಿನಾಂಕ",
    nextVaccinationDate: "ಮುಂದಿನ ಟೀಕೆ",
    dewormingDate: "ಹುಳು ನಿವಾರಣೆ ದಿನಾಂಕ",
    nextDewormingDate: "ಮುಂದಿನ ದಿನಾಂಕ",
    illnessType: "ರೋಗದ ಪ್ರಕಾರ",
    illnessOnsetDate: "ರೋಗ ಶುರು ದಿನಾಂಕ",
    severityLabel: "ತೀವ್ರತೆ",
    severityMild: "ಮಂದ",
    severityModerate: "ಮಧ್ಯಮ",
    severitySevere: "ತಿ್ವರ",
    illnessRemarksLabel: "ಹೆಚ್ಚುವರಿ ಟಿಪ್ಪಣಿ",
    checkupDateLabel: "ಪರಿಶೀಲನೆ ದಿನಾಂಕ",
    checkupRemarksLabel: "ಪರಿಶೀಲನೆ ಟಿಪ್ಪಣಿ",
    saveHealthRecordBtn: "ಆರೋಗ್ಯ ದಾಖಲೆ ಉಳಿಸಿ",
    savingHealthRecord: "ಉಳಿಸಲಾಗುತ್ತಿದೆ...",

    failedToLoadBreedingRecords:
      "ಬೀಜನ ದಾಖಲೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ",
    failedToSaveBreedingRecord:
      "ಬೀಜನ ದಾಖಲಾತಿ ಉಳಿಸಲು ವಿಫಲವಾಗಿದೆ",
    failedToDeleteBreeding:
      "ಬೀಜನ ದಾಖಲಾತಿ ಅಳಿಸಲು ವಿಫಲವಾಗಿದೆ",
    errorDeletingBreeding:
      "ಬೀಜನ ದಾಖಲಾತಿ ಅಳಿಸಲು ದೋಷ",
    serverError: "ಸರ್ವರ್ ದೋಷ",
    selectCattleAndServiceDate:
      "ದಯವಿಟ್ಟು ಜಾನುವಾರು ಮತ್ತು ಸೇವಾ ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ.",

    breedingRecordsTitle: "ಬೀಜನ ದಾಖಲೆಗಳು",
    editBreedingRecordTitle: "ಬೀಜನ ದಾಖಲಾತಿ ತಿದ್ದು",
    addBreedingRecordTitle: "ಬೀಜನ ದಾಖಲಾತಿ ಸೇರಿಸಿ",
    cattleLabel: "ಜಾನುವಾರು",
    selectCattle: "ಜಾನುವಾರು ಆಯ್ಕೆಮಾಡಿ",
    selectPlaceholder: "ಆಯ್ಕೆಮಾಡಿ",
    methodAI: "ಕೃತಕ ಬೀಜನ (AI)",
    methodNatural: "ಸ್ವಾಭಾವಿಕ ಬೀಜನ",
    methodOther: "ಇತರೆ",

    pregStatusNotChecked: "ಪರಿಶೀಲಿಸಿಲ್ಲ",
    pregStatusInseminated: "ಬೀಜನವಾಗಿದೆ",
    pregStatusPregnant: "ಗರ್ಭಿಣಿ",
    pregStatusNotPregnant: "ಗರ್ಭಿಣಿ ಇಲ್ಲ",
    pregStatusAborted: "ಗರ್ಭಪಾತ",
    pregStatusDelivered: "ಪ್ರಸವವಾಗಿದೆ",

    expectedCalvingDate: "ನಿರೀಕ್ಷಿತ ಪ್ರಸವ ದಿನಾಂಕ",
    expectedCalvingHint:
      "ಗರ್ಭಿಣಿ ಸ್ಥಿತಿಯಲ್ಲಿ ಮಾತ್ರ ಸ್ವಯಂ ತುಂಬಲಾಗುತ್ತದೆ.",
    remarksPlaceholder:
      "ಡಾಕ್ಟರ್ ಟಿಪ್ಪಣಿ, ಹೀಟ್ ವರ್ತನೆ, AI ವಿವರಗಳು ಇತ್ಯಾದಿ.",
    updatingBreeding: "ನವೀಕರಿಸಲಾಗುತ್ತಿದೆ...",
    savingBreeding: "ಉಳಿಸಲಾಗುತ್ತಿದೆ...",
    updateBreedingBtn: "ಬೀಜನ ದಾಖಲಾತಿ ನವೀಕರಿಸಿ",
    saveBreedingBtn: "ಬೀಜನ ದಾಖಲಾತಿ ಉಳಿಸಿ",
    selectCattleToViewBreeding:
      "ಬೀಜನ ಇತಿಹಾಸ ನೋಡಲು ಮೇಲಿಂದ ಜಾನುವಾರು ಆಯ್ಕೆಮಾಡಿ.",
    noBreedingRecordsForCattle:
      "ಈ ಜಾನುವಾರಿಗೆ ಬೀಜನ ದಾಖಲೆ ಇಲ್ಲ.",
    editRecordTitle: "ದಾಖಲೆ ತಿದ್ದು",
    deleteRecordTitle: "ದಾಖಲೆ ಅಳಿಸು",

    noUserInfoFound: "ಬಳಕೆದಾರ ಮಾಹಿತಿ ಕಂಡುಬರಲಿಲ್ಲ.",
    farmerProfileTitle: "ರೈತ ಪ್ರೊಫೈಲ್",
    farmerProfileSubtitle:
      "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮತ್ತು ಹಾಲು ಫಾರ್ಮ್ ಮಾಹಿತಿಯನ್ನು ಸುಲಭವಾಗಿ ನಿರ್ವಹಿಸಿ",
    tapToUploadPhoto: "ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಲು ತಟ್ಟಿಸಿ",
    profileNameLabel: "ಹೆಸರು:",
    profilePhoneLabel: "ಫೋನ್:",
    profilePasswordLabel: "ಪಾಸ್‌ವರ್ಡ್:",
    changePasswordLabel: "ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾಯಿಸಿ:",
    pleaseEnterNewPassword:
      "ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ.",
    passwordUpdatedSuccess:
      "✅ ಪಾಸ್‌ವರ್ಡ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!",
    enterNewPasswordPlaceholder: "ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
    updateButton: "ನವೀಕರಿಸಿ",
    totalCattleManagedTitle: "ನಿರ್ವಹಿಸಲಾದ ಒಟ್ಟು ಜಾನುವಾರು",
    suggestionTitle: "ಸಲಹೆ",
    suggestionBody:
      "ನಿಮ್ಮ ದಾಖಲೆಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ನವೀಕರಿಸಿದರೆ, ಹಾಲು ಉತ್ಪಾದನೆ ಮತ್ತು ಆರೋಗ್ಯವನ್ನು ಸುಲಭವಾಗಿ ಗಮನಿಸಬಹುದು. ದಯವಿಟ್ಟು ಆರೋಗ್ಯ ಮತ್ತು ಆಹಾರ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
  },

  /* ---------------- HINDI ---------------- */
  hi: {
    appTitle: "स्मार्ट डेयरी फार्म",

    dairyFarmManagement: "डेयरी फार्म प्रबंधन",
    menu: "मेन्यू",
    home: "होम",
    dashboard: "डैशबोर्ड",
    record: "रिकॉर्ड",
    chat: "चैट",
    voice: "वॉइस",
    profile: "प्रोफ़ाइल",
    logout: "लॉगआउट",
    selectLanguage: "भाषा",
    close: "बंद",
    tips: "टिप्स",
    listening: "सुन रहा हूँ...",
    farmer: "किसान",
    youSaid: "आपने कहा",

    welcome: "स्वागत है",
    loading: "लोड हो रहा है...",
    save: "सेव",
    edit: "संपादन",
    delete: "हटाएँ",
    deleteShort: "हटा",
    actions: "क्रिया",
    cancel: "रद्द",
    yes: "हाँ",
    no: "नहीं",
    unnamed: "बिना नाम",
    notAvailable: "उपलब्ध नहीं",

    navDashboard: "डैशबोर्ड",
    navCattleList: "पशुओं की सूची",
    navRegisterCattle: "पशु पंजीकरण",
    navMilkFeed: "दूध / चारा",
    navHealth: "स्वास्थ्य",
    navBreeding: "प्रजनन",
    navFarmingTips: "कृषि सुझाव",
    navProfile: "प्रोफाइल",
    navLanguage: "भाषा",

    /* --------- DASHBOARD --------- */
    dashboardTitle: "डैशबोर्ड",
    dashboardSubtitle: "दैनिक फ़ार्म अवलोकन",
    totalCattle: "कुल पशु",
    milkToday: "आज का दूध",
    profitToday: "आज का लाभ",
    weeklyMilkTrend: "साप्ताहिक दूध उत्पादन",
    chartComingSoon: "चार्ट जल्द आ रहा है",
    failedToLoadDashboard: "डैशबोर्ड लोड करने में असफल",

    /* --------- RECORD MENU --------- */
    recordMenuTitle: "रिकॉर्ड मेन्यू",
    recordMenuSubtitle: "दैनिक रिकॉर्ड प्रबंधन",
    recordMilkFeed: "दूध & चारा रिकॉर्ड",
    recordHealth: "स्वास्थ्य रिकॉर्ड",
    recordBreeding: "ब्रीडिंग रिकॉर्ड",
    recordExpenses: "खर्चे",

    cattleListTitle: "पशुओं की सूची",
    backToCattleList: "सूची पर वापस जाएँ",
    addCattle: "पशु जोड़ें",
    failedToLoad: "लोड करने में असफल",
    deleteCattleConfirm: "क्या आप यह पशु रिकॉर्ड हटाना चाहते हैं?",

    cattleNotFound: "पशु नहीं मिला",
    downloadCsv: "CSV डाउनलोड",
    printProfile: "प्रोफाइल प्रिंट",

    breed: "नस्‍ल",
    dob: "जन्म तिथि",
    status: "स्थिति",

    avgMilk: "औसत दूध",
    pregnancy: "गर्भावस्था",
    lastBreeding: "आखिरी प्रजनन",
    age: "उम्र",

    totalMilk: "कुल दूध",
    milkIncome: "दूध से आय",
    feedCost: "चारे की लागत",
    profit: "लाभ",
    avgMilkPerDay: "प्रतिदिन औसत दूध",

    milkRecord: "दूध रिकॉर्ड",
    feedRecord: "चारा रिकॉर्ड",
    openMilkFeedPage: "दूध / चारा पेज खोलें",
    noMilkFeedRecords:
      "इस पशु के लिए अभी कोई दूध / चारा रिकॉर्ड नहीं है.",

    milkYieldChartTitle: "रोजाना दूध (ली.)",
    dailyProfitChartTitle: "दैनिक लाभ (₹)",

    date: "तारीख",
    morningLitres: "सुबह (ली.)",
    eveningLitres: "शाम (ली.)",
    totalLitres: "कुल (ली.)",
    milkPricePerLitre: "दूध की दर (₹/ली.)",
    feedType: "चारे का प्रकार",
    qtyKg: "मात्रा (किलो)",
    feedCostLabel: "चारा लागत",

    breedingHistoryTitle: "प्रजनन इतिहास",
    noBreedingRecords:
      "इस पशु के लिए प्रजनन रिकॉर्ड नहीं है.",
    serviceDate: "सेवा तिथि",
    method: "विधि",
    pregnancyStatus: "गर्भावस्था स्थिति",
    expectedCalving: "अपेक्षित बछड़ा तिथि",
    actualCalving: "वास्तविक बछड़ा तिथि",
    remarks: "टिप्पणी",

    healthRecordsTitle: "स्वास्थ्य रिकॉर्ड",
    noHealthRecords:
      "इस पशु के लिए स्वास्थ्य रिकॉर्ड नहीं है.",
    recordedOn: "रिकॉर्ड की तिथि",
    vaccination: "टीकाकरण",
    next: "अगला",
    deworming: "कीड़ा नाशक",
    illness: "बीमारी",
    since: "से",
    severity: "गंभीरता",
    illnessRemarks: "बीमारी टिप्पणी",
    checkupDate: "चेकअप तिथि",
    checkupRemarks: "चेकअप टिप्पणी",

    dairyFarmManagementTitle: "डेयरी फार्म प्रबंधन",
    milkFeedRecordsTitle: "दूध / चारा रिकॉर्ड",

    failedToLoadCattle: "पशुओं को लोड करने में असफल",
    failedToLoadRecords: "रिकॉर्ड लोड करने में असफल",
    failedToSaveMilkFeed:
      "दूध / चारा रिकॉर्ड सेव करने में असफल",
    serverErrorMilkFeed:
      "सर्वर त्रुटि, बाद में पुनः प्रयास करें",
    deleteFailedMilkFeed: "हटाने में त्रुटि",

    voiceNotSupported:
      "इस ब्राउज़र में वॉइस इनपुट सपोर्ट नहीं है",
    confirmDeleteRecord:
      "क्या आप यह रिकॉर्ड हटाना चाहते हैं?",
    pleaseSelectCattleAndDate:
      "कृपया पशु और तारीख चुनें",

    selectCattleLabel: "पशु चुनें",
    milkPriceLabel: "दूध की दर (₹ / ली.)",
    quantityKgPerDay: "मात्रा (किलो / दिन)",
    costPerKg: "प्रति किलो दर (₹)",
    dailyFeedCost: "दैनिक चारा लागत (₹)",
    morningYield: "सुबह दूध (ली.)",
    eveningYield: "शाम दूध (ली.)",
    totalYield: "कुल दूध (ली.)",
    runningCostLabel: "अन्य दैनिक खर्च (₹)",
    earningsPerDay: "दैनिक लाभ (₹)",

    saving: "सेव हो रहा है...",
    updating: "अपडेट हो रहा है...",
    saveRecordBtn: "💾 रिकॉर्ड सेव करें",
    updateRecordBtn: "✏ रिकॉर्ड अपडेट करें",
    cancelEdit: "✖ संपादन रद्द करें",

    savedRecordsTitle: "सेव किए गए रिकॉर्ड",
    selectedCattleSuffix: "चुना हुआ पशु",
    loadingRecords: "रिकॉर्ड लोड हो रहे हैं...",
    cattleColumn: "पशु",
    qtyKgPerDayColumn: "मात्रा (किलो/दिन)",
    costPerKgColumn: "दर/किलो (₹)",
    feedCostColumn: "चारा लागत (₹)",
    milkPriceColumn: "दूध की दर (₹/ली.)",
    totalYieldColumn: "कुल दूध (ली.)",
    earningsColumn: "लाभ (₹/दिन)",
    noRecordsForThisCattle:
      "इस पशु के लिए रिकॉर्ड नहीं है.",

    healthRecordTitle: "स्वास्थ्य रिकॉर्ड",
    failedToLoadCattleList:
      "पशु सूची लोड करने में असफल",
    pleaseSelectCattle: "कृपया पशु चुनें.",
    healthRecordSaved:
      "स्वास्थ्य रिकॉर्ड सेव हो गया है.",

    vaccinationSection: "टीकाकरण",
    dewormingSection: "कीड़ा नाशक",
    illnessSection: "बीमारी विवरण",
    checkupSection: "चेकअप",

    vaccinationDate: "टीकाकरण तिथि",
    nextVaccinationDate: "अगली तिथि",
    dewormingDate: "कीड़ा नाशक तिथि",
    nextDewormingDate: "अगली तिथि",
    illnessType: "बीमारी का प्रकार",
    illnessOnsetDate: "बीमारी शुरू तिथि",
    severityLabel: "गंभीरता",
    severityMild: "हल्की",
    severityModerate: "मध्यम",
    severitySevere: "गंभीर",
    illnessRemarksLabel: "अतिरिक्त टिप्पणी",
    checkupDateLabel: "चेकअप तिथि",
    checkupRemarksLabel: "चेकअप टिप्पणी",
    saveHealthRecordBtn: "स्वास्थ्य रिकॉर्ड सेव करें",
    savingHealthRecord: "सेव हो रहा है...",

    failedToLoadBreedingRecords:
      "प्रजनन रिकॉर्ड लोड करने में असफल",
    failedToSaveBreedingRecord:
      "प्रजनन रिकॉर्ड सेव करने में असफल",
    failedToDeleteBreeding:
      "प्रजनन रिकॉर्ड हटाने में असफल",
    errorDeletingBreeding:
      "प्रजनन रिकॉर्ड हटाने में त्रुटि",
    serverError: "सर्वर त्रुटि",
    selectCattleAndServiceDate:
      "कृपया पशु और सेवा तिथि चुनें.",

    breedingRecordsTitle: "प्रजनन रिकॉर्ड",
    editBreedingRecordTitle: "प्रजनन रिकॉर्ड संपादन",
    addBreedingRecordTitle: "प्रजनन रिकॉर्ड जोड़ें",
    cattleLabel: "पशु",
    selectCattle: "पशु चुनें",
    selectPlaceholder: "चुनें",
    methodAI: "कृत्रिम गर्भाधान (AI)",
    methodNatural: "प्राकृतिक सेवा",
    methodOther: "अन्य",

    pregStatusNotChecked: "जांच नहीं",
    pregStatusInseminated: "गर्भाधान किया गया",
    pregStatusPregnant: "गर्भवती",
    pregStatusNotPregnant: "गर्भवती नहीं",
    pregStatusAborted: "गर्भपात",
    pregStatusDelivered: "बछड़ा हो चुका",

    expectedCalvingDate: "अपेक्षित बछड़ा तिथि",
    expectedCalvingHint:
      "केवल गर्भवती स्थिति में ऑटो-फिल होगा.",
    remarksPlaceholder:
      "डॉक्टर नोट्स, हीट व्यवहार, AI विवरण आदि.",
    updatingBreeding: "अपडेट हो रहा है...",
    savingBreeding: "सेव हो रहा है...",
    updateBreedingBtn:
      "प्रजनन रिकॉर्ड अपडेट करें",
    saveBreedingBtn: "प्रजनन रिकॉर्ड सेव करें",
    selectCattleToViewBreeding:
      "प्रजनन इतिहास देखने के लिए ऊपर से पशु चुनें.",
    noBreedingRecordsForCattle:
      "इस पशु के लिए प्रजनन रिकॉर्ड नहीं है.",
    editRecordTitle: "रिकॉर्ड संपादन",
    deleteRecordTitle: "रिकॉर्ड हटाएँ",

    noUserInfoFound: "यूज़र जानकारी नहीं मिली.",
    farmerProfileTitle: "किसान प्रोफाइल",
    farmerProfileSubtitle:
      "अपनी निजी और फार्म जानकारी आसानी से संभालें",
    tapToUploadPhoto:
      "फोटो अपलोड करने के लिए टैप करें",
    profileNameLabel: "नाम:",
    profilePhoneLabel: "फ़ोन:",
    profilePasswordLabel: "पासवर्ड:",
    changePasswordLabel: "पासवर्ड बदलें:",
    pleaseEnterNewPassword:
      "कृपया नया पासवर्ड दर्ज करें.",
    passwordUpdatedSuccess:
      "✅ पासवर्ड सफलतापूर्वक अपडेट हुआ!",
    enterNewPasswordPlaceholder: "नया पासवर्ड दर्ज करें",
    updateButton: "अपडेट",
    totalCattleManagedTitle: "कुल प्रबंधित पशु",
    suggestionTitle: "सुझाव",
    suggestionBody:
      "अप-टू-डेट रिकॉर्ड रखने से दूध उत्पादन और स्वास्थ्य पर बेहतर नज़र रखी जा सकती है. कृपया नियमित रूप से स्वास्थ्य और चारा विवरण देखें.",
  },

  /* ---------------- TELUGU ---------------- */
  te: {
    appTitle: "స్మార్ట్ డెయిరీ ఫారం",

    dairyFarmManagement: "డెయిరీ ఫారం నిర్వాహణ",
    menu: "మెను",
    home: "హోమ్",
    dashboard: "డాష్‌బోర్డు",
    record: "రికార్డు",
    chat: "చాట్",
    voice: "వాయిస్",
    profile: "ప్రొఫైల్",
    logout: "లాగౌట్",
    selectLanguage: "భాష",
    close: "మూసివేయి",
    tips: "సూచనలు",
    listening: "వినుతున్నాను...",
    farmer: "రైతు",
    youSaid: "మీరు చెప్పారు",

    welcome: "స్వాగతం",
    loading: "లోడవుతోంది...",
    save: "సేవ్",
    edit: "మార్చు",
    delete: "తొలగించు",
    deleteShort: "తొల",
    actions: "చర్యలు",
    cancel: "రద్దు",
    yes: "అవును",
    no: "కాదు",
    unnamed: "పేరు లేదు",
    notAvailable: "లభ్యం కాదు",

    navDashboard: "డాష్‌బోర్డ్",
    navCattleList: "పశువుల జాబితా",
    navRegisterCattle: "పశు నమోదు",
    navMilkFeed: "పాలు / మేత",
    navHealth: "ఆరోగ్యం",
    navBreeding: "ప్రజననం",
    navFarmingTips: "వ్యవసాయ సూచనలు",
    navProfile: "ప్రొఫైల్",
    navLanguage: "భాష",

    /* --------- DASHBOARD --------- */
    dashboardTitle: "డాష్‌బోర్డ్",
    dashboardSubtitle: "రోజువారీ ఫారమ్ సమాచారం",
    totalCattle: "మొత్తం పశువులు",
    milkToday: "ఈరోజు పాలు",
    profitToday: "ఈరోజు లాభం",
    weeklyMilkTrend: "వారపు పాల ఉత్పత్తి",
    chartComingSoon: "చార్ట్ త్వరలో",
    failedToLoadDashboard: "డాష్‌బోర్డ్ లోడ్ విఫలమైంది",

    /* --------- RECORD MENU --------- */
    recordMenuTitle: "రికార్డ్ మెను",
    recordMenuSubtitle: "రోజువారీ రికార్డులు నిర్వహించండి",
    recordMilkFeed: "పాలు & మేత రికార్డులు",
    recordHealth: "ఆరోగ్య రికార్డులు",
    recordBreeding: "పరిచయం రికార్డులు",
    recordExpenses: "ఖర్చులు",

    cattleListTitle: "పశువుల జాబితా",
    backToCattleList: "జాబితాకు తిరిగి వెళ్ళండి",
    addCattle: "పశు జోడించండి",
    failedToLoad: "లోడ్ చేయడంలో విఫలమైంది",
    deleteCattleConfirm: "ఈ పశు రికార్డ్ తొలగించాలా?",

    cattleNotFound: "పశు కనబడలేదు",
    downloadCsv: "CSV డౌన్‌లోడ్",
    printProfile: "ప్రొఫైల్ ప్రింట్",

    breed: "జాతి",
    dob: "పుట్టిన తేదీ",
    status: "స్థితి",

    avgMilk: "సగటు పాలు",
    pregnancy: "గర్భం",
    lastBreeding: "చివరి ప్రజననం",
    age: "వయసు",

    totalMilk: "మొత్తం పాలు",
    milkIncome: "పాల ద్వారా ఆదాయం",
    feedCost: "మేత ఖర్చు",
    profit: "లాభం",
    avgMilkPerDay: "రోజుకు సగటు పాలు",

    milkRecord: "పాల రికార్డు",
    feedRecord: "మేత రికార్డు",
    openMilkFeedPage: "పాలు / మేత పేజీ తెరవండి",
    noMilkFeedRecords:
      "ఈ పశువుకు ఇంకా పాలు / మేత రికార్డు లేదు.",

    milkYieldChartTitle: "రోజువారీ పాలు (లీ)",
    dailyProfitChartTitle: "రోజువారీ లాభం (₹)",

    date: "తేదీ",
    morningLitres: "ఉదయం (లీ)",
    eveningLitres: "సాయంత్రం (లీ)",
    totalLitres: "మొత్తం (లీ)",
    milkPricePerLitre: "పాల రేటు (₹/లీ)",
    feedType: "మేత రకం",
    qtyKg: "పరిమాణం (కిలో)",
    feedCostLabel: "మేత ఖర్చు",

    breedingHistoryTitle: "ప్రజనన చరిత్ర",
    noBreedingRecords:
      "ఈ పశువుకు ప్రజనన రికార్డు లేదు.",
    serviceDate: "సర్వీస్ తేదీ",
    method: "విధానం",
    pregnancyStatus: "గర్భం స్థితి",
    expectedCalving: "అంచనా పిల్ల జననం",
    actualCalving: "నిజమైన పిల్ల జననం",
    remarks: "గమనిక",

    healthRecordsTitle: "ఆరోగ్య రికార్డులు",
    noHealthRecords: "ఈ పశువుకు ఆరోగ్య రికార్డు లేదు.",
    recordedOn: "రికార్డు చేసిన తేదీ",
    vaccination: "టీకా",
    next: "తర్వాత",
    deworming: "పురుగు మందు",
    illness: "వ్యాధి",
    since: "నుండి",
    severity: "తీవ్రత",
    illnessRemarks: "వ్యాధి గమనిక",
    checkupDate: "చెకప్ తేదీ",
    checkupRemarks: "చెకప్ గమనిక",

    dairyFarmManagementTitle: "డెయిరీ ఫారం నిర్వహణ",
    milkFeedRecordsTitle: "పాలు / మేత రికార్డులు",

    failedToLoadCattle:
      "పశువులను లోడ్ చేయడంలో విఫలమైంది",
    failedToLoadRecords:
      "రికార్డులను లోడ్ చేయడంలో విఫలమైంది",
    failedToSaveMilkFeed:
      "పాలు / మేత రికార్డు సేవ్ కాలేదు",
    serverErrorMilkFeed: "సర్వర్ లోపం, మళ్లీ ప్రయత్నించండి",
    deleteFailedMilkFeed: "తొలగించడంలో లోపం",

    voiceNotSupported:
      "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ సపోర్ట్ లేదు",
    confirmDeleteRecord: "ఈ రికార్డు తొలగించాలా?",
    pleaseSelectCattleAndDate:
      "దయచేసి పశువు మరియు తేదీ ఎంచుకోండి",

    selectCattleLabel: "పశువు ఎంచుకోండి",
    milkPriceLabel: "పాల రేటు (₹ / లీ)",
    quantityKgPerDay: "పరిమాణం (కిలో / రోజు)",
    costPerKg: "ప్రతి కిలో ధర (₹)",
    dailyFeedCost: "రోజువారీ మేత ఖర్చు (₹)",
    morningYield: "ఉదయం పాలు (లీ)",
    eveningYield: "సాయంత్రం పాలు (లీ)",
    totalYield: "మొత్తం పాలు (లీ)",
    runningCostLabel: "ఇతర రోజువారీ ఖర్చు (₹)",
    earningsPerDay: "రోజుకు లాభం (₹)",

    saving: "సేవ్ అవుతోంది...",
    updating: "అప్‌డేట్ అవుతోంది...",
    saveRecordBtn: "💾 రికార్డు సేవ్ చేయండి",
    updateRecordBtn: "✏ రికార్డు అప్‌డేట్ చేయండి",
    cancelEdit: "✖ మార్చడం రద్దు",

    savedRecordsTitle: "సేవ్ అయిన రికార్డులు",
    selectedCattleSuffix: "ఎంచుకున్న పశువు",
    loadingRecords: "రికార్డులు లోడ్ అవుతున్నాయి...",
    cattleColumn: "పశువు",
    qtyKgPerDayColumn: "పరిమాణం (కిలో/రోజు)",
    costPerKgColumn: "ధర/కిలో (₹)",
    feedCostColumn: "మేత ఖర్చు (₹)",
    milkPriceColumn: "పాల రేటు (₹/లీ)",
    totalYieldColumn: "మొత్తం పాలు (లీ)",
    earningsColumn: "లాభం (₹/రోజు)",
    noRecordsForThisCattle:
      "ఈ పశువుకు రికార్డులు లేవు.",

    healthRecordTitle: "ఆరోగ్య రికార్డు",
    failedToLoadCattleList:
      "పశువుల జాబితా లోడ్ చేయడంలో విఫలమైంది",
    pleaseSelectCattle: "దయచేసి పశువెంచుకోండి.",
    healthRecordSaved: "ఆరోగ్య రికార్డు సేవ్ అయింది.",

    vaccinationSection: "టీకా",
    dewormingSection: "పురుగు మందు",
    illnessSection: "వ్యాధి వివరాలు",
    checkupSection: "చెకప్",

    vaccinationDate: "టీకా తేదీ",
    nextVaccinationDate: "తర్వాత టీకా",
    dewormingDate: "పురుగు మందు తేదీ",
    nextDewormingDate: "తర్వాత తేదీ",
    illnessType: "వ్యాధి రకం",
    illnessOnsetDate: "వ్యాధి మొదలైన తేదీ",
    severityLabel: "తీవ్రత",
    severityMild: "తక్కువ",
    severityModerate: "మధ్యస్థ",
    severitySevere: "తీవ్ర",
    illnessRemarksLabel: "అదనపు గమనిక",
    checkupDateLabel: "చెకప్ తేదీ",
    checkupRemarksLabel: "చెకప్ గమనిక",
    saveHealthRecordBtn:
      "ఆరోగ్య రికార్డు సేవ్ చేయండి",
    savingHealthRecord: "సేవ్ అవుతోంది...",

    failedToLoadBreedingRecords:
      "ప్రజనన రికార్డులు లోడ్ చేయడంలో విఫలమైంది",
    failedToSaveBreedingRecord:
      "ప్రజనన రికార్డు సేవ్ కాలేదు",
    failedToDeleteBreeding:
      "ప్రజనన రికార్డు తొలగించడంలో విఫలమైంది",
    errorDeletingBreeding:
      "ప్రజనన రికార్డు తొలగించడంలో లోపం",
    serverError: "సర్వర్ లోపం",
    selectCattleAndServiceDate:
      "దయచేసి పశువు మరియు సర్వీస్ తేదీ ఎంచుకోండి.",

    breedingRecordsTitle: "ప్రజనన రికార్డులు",
    editBreedingRecordTitle:
      "ప్రజనన రికార్డు మార్పు",
    addBreedingRecordTitle:
      "ప్రజనన రికార్డు జోడించండి",
    cattleLabel: "పశువు",
    selectCattle: "పశువు ఎంచుకోండి",
    selectPlaceholder: "ఎంచుకోండి",
    methodAI: "కృత్రిమ గర్భాధానం (AI)",
    methodNatural: "స్వభావిక సర్వీస్",
    methodOther: "ఇతర",

    pregStatusNotChecked: "తనిఖీ చేయలేదు",
    pregStatusInseminated: "గర్భాధానం అయ్యింది",
    pregStatusPregnant: "గర్భవతి",
    pregStatusNotPregnant: "గర్భవతి కాదు",
    pregStatusAborted: "గర్భస్రావం",
    pregStatusDelivered: "పిల్ల పుట్టింది",

    expectedCalvingDate:
      "అంచనా పిల్ల జననం తేదీ",
    expectedCalvingHint:
      "గర్భవతి స్థితిలో ఉన్నప్పుడు మాత్రమే ఆటో ఫిల్ అవుతుంది.",
    remarksPlaceholder:
      "వైద్యుడి గమనికలు, హీట్ ప్రవర్తన, AI వివరాలు మొదలైనవి.",
    updatingBreeding: "అప్‌డేట్ అవుతోంది...",
    savingBreeding: "సేవ్ అవుతోంది...",
    updateBreedingBtn:
      "ప్రజనన రికార్డు అప్‌డేట్ చేయండి",
    saveBreedingBtn:
      "ప్రజనన రికార్డు సేవ్ చేయండి",
    selectCattleToViewBreeding:
      "ప్రజనన చరిత్ర చూడటానికి పశువును ఎంచుకోండి.",
    noBreedingRecordsForCattle:
      "ఈ పశువుకు ప్రజనన రికార్డు లేదు.",
    editRecordTitle: "రికార్డు మార్పు",
    deleteRecordTitle: "రికార్డు తొలగించు",

    noUserInfoFound: "యూజర్ సమాచారం కనబడలేదు.",
    farmerProfileTitle: "రైతు ప్రొఫైల్",
    farmerProfileSubtitle:
      "మీ వ్యక్తిగత మరియు ఫారం వివరాలను సులభంగా నిర్వహించండి",
    tapToUploadPhoto:
      "ఫోటో అప్లోడ్ చేయడానికి ట్యాప్ చేయండి",
    profileNameLabel: "పేరు:",
    profilePhoneLabel: "ఫోన్:",
    profilePasswordLabel: "పాస్వర్డ్:",
    changePasswordLabel: "పాస్వర్డ్ మార్చండి:",
    pleaseEnterNewPassword:
      "దయచేసి కొత్త పాస్వర్డ్ నమోదు చేయండి.",
    passwordUpdatedSuccess:
      "✅ పాస్వర్డ్ విజయవంతంగా అప్‌డేట్ అయింది!",
    enterNewPasswordPlaceholder:
      "కొత్త పాస్వర్డ్ నమోదు చేయండి",
    updateButton: "అప్‌డేట్",
    totalCattleManagedTitle:
      "మొత్తం నిర్వహిస్తున్న పశువులు",
    suggestionTitle: "సూచన",
    suggestionBody:
      "రికార్డులు అప్డేట్ చేయడం ద్వారా పాలు, ఆరోగ్యం, ఖర్చు అన్నింటిని బాగా గమనించవచ్చు. దయచేసి ఆరోగ్య మరియు మేత వివరాలను తరచుగా చెక్ చేయండి.",
  },

  /* ---------------- TAMIL ---------------- */
  ta: {
    appTitle: "ஸ்மார்ட் டெய்ரி பண்ணை",

    dairyFarmManagement: "டெய்ரி பண்ணை மேலாண்மை",
    menu: "மெனு",
    home: "முகப்பு",
    dashboard: "டாஷ்போர்டு",
    record: "பதிவு",
    chat: "சாட்",
    voice: "வாய்ஸ்",
    profile: "சுயவிவரம்",
    logout: "வெளியேறு",
    selectLanguage: "மொழி",
    close: "மூடு",
    tips: "டிப்ஸ்",
    listening: "கேட்கிறது...",
    farmer: "விவசாயி",
    youSaid: "நீங்கள் சொன்னது",

    welcome: "வரவேற்கிறோம்",
    loading: "ஏற்றப்படுகிறது...",
    save: "சேமி",
    edit: "திருத்து",
    delete: "அழி",
    deleteShort: "அழி",
    actions: "நடவடிக்கை",
    cancel: "ரத்து",
    yes: "ஆம்",
    no: "இல்லை",
    unnamed: "பெயரில்லா",
    notAvailable: "இல்லை",

    navDashboard: "டாஷ்போர்டு",
    navCattleList: "கால்நடை பட்டியல்",
    navRegisterCattle: "கால்நடை பதிவு",
    navMilkFeed: "பால் / தீவனம்",
    navHealth: "ஆரோக்கியம்",
    navBreeding: "இனப்பெருக்கு",
    navFarmingTips: "விவசாய குறிப்புகள்",
    navProfile: "சுயவிவரம்",
    navLanguage: "மொழி",

    /* --------- DASHBOARD --------- */
    dashboardTitle: "டாஷ்போர்டு",
    dashboardSubtitle: "தினசரி பண்ணை நிலை",
    totalCattle: "மொத்த மாடு",
    milkToday: "இன்றைய பால்",
    profitToday: "இன்றைய லாபம்",
    weeklyMilkTrend: "வாராந்திர பால்",
    chartComingSoon: "வரைபடம் விரைவில்",
    failedToLoadDashboard: "டாஷ்போர்டு ஏற்ற முடியவில்லை",

    /* --------- RECORD MENU --------- */
    recordMenuTitle: "பதிவு மெனு",
    recordMenuSubtitle: "தினசரி பதிவுகளை மேலாண்மை",
    recordMilkFeed: "பால் & தீவன பதிவு",
    recordHealth: "ஆரோக்கிய பதிவு",
    recordBreeding: "இனப்பெருக்கு பதிவு",
    recordExpenses: "செலவுகள்",

    cattleListTitle: "கால்நடை பட்டியல்",
    backToCattleList: "பட்டியலுக்கு திரும்பவும்",
    addCattle: "கால்நடை சேர்க்க",
    failedToLoad: "ஏற்ற முடியவில்லை",
    deleteCattleConfirm:
      "இந்த கால்நடை பதிவை அழிக்க வேண்டுமா?",

    cattleNotFound: "கால்நடை கிடைக்கவில்லை",
    downloadCsv: "CSV பதிவிறக்கம்",
    printProfile: "சுயவிவரம் அச்சிடு",

    breed: "இனம்",
    dob: "பிறந்த தேதி",
    status: "நிலை",

    avgMilk: "சராசரி பால்",
    pregnancy: "கர்ப்பம்",
    lastBreeding: "கடைசி இனப்பெருக்கு",
    age: "வயது",

    totalMilk: "மொத்த பால்",
    milkIncome: "பாலில் இருந்து வருமானம்",
    feedCost: "தீவன செலவு",
    profit: "லாபம்",
    avgMilkPerDay: "நாளுக்கு சராசரி பால்",

    milkRecord: "பால் பதிவு",
    feedRecord: "தீவன பதிவு",
    openMilkFeedPage: "பால் / தீவன பக்கம் திறக்க",
    noMilkFeedRecords:
      "இந்த கால்நடைக்கு பால் / தீவன பதிவு இல்லை.",

    milkYieldChartTitle:
      "நாள் தோறும் பால் (லிட்டர்)",
    dailyProfitChartTitle: "தினசரி லாபம் (₹)",

    date: "தேதி",
    morningLitres: "காலை (லீ.)",
    eveningLitres: "மாலை (லீ.)",
    totalLitres: "மொத்தம் (லீ.)",
    milkPricePerLitre: "பால் விலை (₹/லீ.)",
    feedType: "தீவன வகை",
    qtyKg: "அளவு (கி.கா.)",
    feedCostLabel: "தீவன செலவு",

    breedingHistoryTitle:
      "இனப்பெருக்கு வரலாறு",
    noBreedingRecords:
      "இந்த கால்நடைக்கு இனப்பெருக்கு பதிவு இல்லை.",
    serviceDate: "சேவை தேதி",
    method: "முறை",
    pregnancyStatus: "கர்ப்ப நிலை",
    expectedCalving: "எதிர்பார்க்கும் கன்றுக் கால்",
    actualCalving: "உண்மை கன்றுக் கால்",
    remarks: "குறிப்பு",

    healthRecordsTitle:
      "ஆரோக்கிய பதிவுகள்",
    noHealthRecords:
      "இந்த கால்நடைக்கு ஆரோக்கிய பதிவு இல்லை.",
    recordedOn: "பதிவு செய்யப்பட்ட தேதி",
    vaccination: "தடுப்பூசி",
    next: "அடுத்து",
    deworming: "புழு மருந்து",
    illness: "நோய்",
    since: "முதல்",
    severity: "கடுமை",
    illnessRemarks: "நோய் குறிப்பு",
    checkupDate: "சோதனை தேதி",
    checkupRemarks: "சோதனை குறிப்பு",

    dairyFarmManagementTitle:
      "டெய்ரி பண்ணை மேலாண்மை",
    milkFeedRecordsTitle:
      "பால் / தீவன பதிவுகள்",

    failedToLoadCattle:
      "கால்நடைகளை ஏற்ற முடியவில்லை",
    failedToLoadRecords:
      "பதிவுகளை ஏற்ற முடியவில்லை",
    failedToSaveMilkFeed:
      "பால் / தீவன பதிவை சேமிக்க முடியவில்லை",
    serverErrorMilkFeed:
      "சர்வர் பிழை, பின்னர் முயற்சி செய்யவும்",
    deleteFailedMilkFeed: "அழிப்பதில் பிழை",

    voiceNotSupported:
      "இந்த உலாவியில் குரல் உள்ளீடு இல்லை",
    confirmDeleteRecord:
      "இந்த பதிவை அழிக்க வேண்டுமா?",
    pleaseSelectCattleAndDate:
      "தயவு செய்து கால்நடை மற்றும் தேதியைத் தேர்ந்தெடுக்கவும்",

    selectCattleLabel: "கால்நடை தேர்வு",
    milkPriceLabel: "பால் விலை (₹ / லீ.)",
    quantityKgPerDay:
      "அளவு (கி.கா / நாள்)",
    costPerKg: "கி.கா ஒன்றுக்கு விலை (₹)",
    dailyFeedCost:
      "தினசரி தீவன செலவு (₹)",
    morningYield:
      "காலை பால் (லீ.)",
    eveningYield:
      "மாலை பால் (லீ.)",
    totalYield: "மொத்த பால் (லீ.)",
    runningCostLabel:
      "மற்ற தினசரி செலவு (₹)",
    earningsPerDay:
      "நாளுக்கு லாபம் (₹)",

    saving: "சேமித்து வருகிறது...",
    updating: "புதுப்பிக்கிறது...",
    saveRecordBtn: "💾 பதிவு சேமி",
    updateRecordBtn: "✏ பதிவு புதுப்பி",
    cancelEdit:
      "✖ திருத்தத்தை ரத்து செய்",

    savedRecordsTitle:
      "சேமிக்கப்பட்ட பதிவுகள்",
    selectedCattleSuffix:
      "தேர்ந்த கால்நடை",
    loadingRecords:
      "பதிவுகள் ஏற்றப்படுகிறது...",
    cattleColumn: "கால்நடை",
    qtyKgPerDayColumn:
      "அளவு (கி.கா/நாள்)",
    costPerKgColumn:
      "விலை/கி.கா (₹)",
    feedCostColumn:
      "தீவன செலவு (₹)",
    milkPriceColumn:
      "பால் விலை (₹/லீ.)",
    totalYieldColumn:
      "மொத்த பால் (லீ.)",
    earningsColumn:
      "லாபம் (₹/நாள்)",
    noRecordsForThisCattle:
      "இந்த கால்நடைக்கு பதிவு இல்லை.",

    healthRecordTitle:
      "ஆரோக்கிய பதிவு",
    failedToLoadCattleList:
      "கால்நடை பட்டியலை ஏற்ற முடியவில்லை",
    pleaseSelectCattle:
      "தயவு செய்து கால்நடை தேர்வு செய்யவும்.",
    healthRecordSaved:
      "ஆரோக்கிய பதிவு சேமிக்கப்பட்டது.",

    vaccinationSection: "தடுப்பூசி",
    dewormingSection: "புழு மருந்து",
    illnessSection:
      "நோய் விவரம்",
    checkupSection: "சோதனை",

    vaccinationDate:
      "தடுப்பூசி தேதி",
    nextVaccinationDate:
      "அடுத்த தேதி",
    dewormingDate:
      "புழு மருந்து தேதி",
    nextDewormingDate:
      "அடுத்த தேதி",
    illnessType: "நோய் வகை",
    illnessOnsetDate:
      "நோய் தொடங்கிய தேதி",
    severityLabel: "கடுமை",
    severityMild: "லேசான",
    severityModerate: "மிதமான",
    severitySevere: "கடுமையான",
    illnessRemarksLabel:
      "கூடுதல் குறிப்பு",
    checkupDateLabel:
      "சோதனை தேதி",
    checkupRemarksLabel:
      "சோதனை குறிப்பு",
    saveHealthRecordBtn:
      "ஆரோக்கிய பதிவை சேமிக்கவும்",
    savingHealthRecord:
      "சேமித்து வருகிறது...",

    failedToLoadBreedingRecords:
      "இனப்பெருக்கு பதிவுகளை ஏற்ற முடியவில்லை",
    failedToSaveBreedingRecord:
      "இனப்பெருக்கு பதிவை சேமிக்க முடியவில்லை",
    failedToDeleteBreeding:
      "இனப்பெருக்கு பதிவை அழிக்க முடியவில்லை",
    errorDeletingBreeding:
      "இனப்பெருக்கு அழிப்பதில் பிழை",
    serverError: "சர்வர் பிழை",
    selectCattleAndServiceDate:
      "கால்நடை மற்றும் சேவை தேதியைத் தேர்ந்தெடுக்கவும்.",

    breedingRecordsTitle:
      "இனப்பெருக்கு பதிவுகள்",
    editBreedingRecordTitle:
      "இனப்பெருக்கு பதிவு திருத்து",
    addBreedingRecordTitle:
      "இனப்பெருக்கு பதிவு சேர்க்க",
    cattleLabel: "கால்நடை",
    selectCattle:
      "கால்நடை தேர்வு செய்யவும்",
    selectPlaceholder: "தேர்வு",
    methodAI:
      "கிருத்திர இரட்டிப்பு (AI)",
    methodNatural:
      "இயற்கை சேவை",
    methodOther: "மற்றவை",

    pregStatusNotChecked:
      "சரிபார்க்கவில்லை",
    pregStatusInseminated:
      "இரட்டிப்பு முடிந்தது",
    pregStatusPregnant: "கர்ப்பம்",
    pregStatusNotPregnant:
      "கர்ப்பம் இல்லை",
    pregStatusAborted:
      "கரு கலைப்பு",
    pregStatusDelivered:
      "கன்று போனது",

    expectedCalvingDate:
      "எதிர்பார்க்கும் கன்று பிறப்பு தேதி",
    expectedCalvingHint:
      "கர்ப்பம் என்று தேர்வு செய்தால் தானாக நிரப்பப்படும்.",
    remarksPlaceholder:
      "டாக்டர் குறிப்புகள், ஹீட் நடத்தை, AI விவரங்கள் போன்றவை.",
    updatingBreeding:
      "புதுப்பிக்கிறது...",
    savingBreeding:
      "சேமித்து வருகிறது...",
    updateBreedingBtn:
      "இனப்பெருக்கு பதிவை புதுப்பிக்கவும்",
    saveBreedingBtn:
      "இனப்பெருக்கு பதிவை சேமிக்கவும்",
    selectCattleToViewBreeding:
      "இனப்பெருக்கு வரலாறு பார்க்க கால்நடை தேர்வு செய்யவும்.",
    noBreedingRecordsForCattle:
      "இந்த கால்நடைக்கு இனப்பெருக்கு பதிவு இல்லை.",
    editRecordTitle: "பதிவு திருத்து",
    deleteRecordTitle: "பதிவு அழி",

    noUserInfoFound:
      "பயனர் தகவல் கிடைக்கவில்லை.",
    farmerProfileTitle:
      "உழவர் சுயவிவரம்",
    farmerProfileSubtitle:
      "உங்கள் தனிப்பட்ட மற்றும் பண்ணை விவரங்களை எளிதாக பராமரிக்கவும்",
    tapToUploadPhoto:
      "புகைப்படம் சேர்க்க தட்டவும்",
    profileNameLabel: "பெயர்:",
    profilePhoneLabel:
      "தொலைபேசி:",
    profilePasswordLabel:
      "கடவுச்சொல்:",
    changePasswordLabel:
      "கடவுச்சொல்லை மாற்றவும்:",
    pleaseEnterNewPassword:
      "புதிய கடவுச்சொல்லை உள்ளிடவும்.",
    passwordUpdatedSuccess:
      "✅ கடவுச்சொல் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!",
    enterNewPasswordPlaceholder:
      "புதிய கடவுச்சொல்லை உள்ளிடவும்",
    updateButton: "புதுப்பி",
    totalCattleManagedTitle:
      "நிர்வகிக்கும் மொத்த கால்நடைகள்",
    suggestionTitle: "பரிந்துரை",
    suggestionBody:
      "பதிவுகளை சரியாக புதுப்பித்து வைத்தால் பால் உற்பத்தி, ஆரோக்கியம், செலவு அனைத்தையும் எளிதாக கண்காணிக்கலாம். தயவுசெய்து ஆரோக்கியம் மற்றும் தீவன விவரங்களை வழக்கமாக பார்க்கவும்.",
  },

  /* ---------------- MARATHI ---------------- */
  mr: {
    appTitle: "स्मार्ट डेअरी फार्म",

    dairyFarmManagement: "डेअरी फार्म व्यवस्थापन",
    menu: "मेनू",
    home: "होम",
    dashboard: "डॅशबोर्ड",
    record: "रेकॉर्ड",
    chat: "चॅट",
    voice: "व्हॉइस",
    profile: "प्रोफाइल",
    logout: "लॉगआउट",
    selectLanguage: "भाषा",
    close: "बंद",
    tips: "टिप्स",
    listening: "ऐकत आहे...",
    farmer: "शेतकरी",
    youSaid: "तुम्ही म्हणालात",

    welcome: "स्वागत आहे",
    loading: "लोड होत आहे...",
    save: "सेव्ह",
    edit: "संपादित",
    delete: "काढून टाका",
    deleteShort: "काढा",
    actions: "क्रिया",
    cancel: "रद्द",
    yes: "होय",
    no: "नाही",
    unnamed: "नाव नाही",
    notAvailable: "उपलब्ध नाही",

    navDashboard: "डॅशबोर्ड",
    navCattleList: "जनावरांची यादी",
    navRegisterCattle: "जनावर नोंदणी",
    navMilkFeed: "दूध / चारा",
    navHealth: "आरोग्य",
    navBreeding: "प्रजनन",
    navFarmingTips: "शेती टिप्स",
    navProfile: "प्रोफाइल",
    navLanguage: "भाषा",

    /* --------- DASHBOARD --------- */
    dashboardTitle: "डॅशबोर्ड",
    dashboardSubtitle: "दैनिक शेत स्थिती",
    totalCattle: "एकूण जनावरे",
    milkToday: "आजचे दूध",
    profitToday: "आजचा नफा",
    weeklyMilkTrend: "साप्ताहिक दूध",
    chartComingSoon: "लवकरच उपलब्ध",
    failedToLoadDashboard: "डॅशबोर्ड लोड करण्यात अयशस्वी",

    /* --------- RECORD MENU --------- */
    recordMenuTitle: "रेकॉर्ड मेनू",
    recordMenuSubtitle: "दैनिक नोंदी व्यवस्थापन",
    recordMilkFeed: "दूध व चारा",
    recordHealth: "आरोग्य नोंदी",
    recordBreeding: "प्रजनन नोंदी",
    recordExpenses: "खर्च",

    cattleListTitle: "जनावरांची यादी",
    backToCattleList: "यादीकडे परत जा",
    addCattle: "जनावर जोडा",
    failedToLoad: "लोड करण्यात अयशस्वी",
    deleteCattleConfirm:
      "हे जनावराचे रेकॉर्ड काढून टाकायचे आहे का?",

    cattleNotFound: "जनावर सापडले नाही",
    downloadCsv: "CSV डाउनलोड",
    printProfile: "प्रोफाइल प्रिंट",

    breed: "जात",
    dob: "जन्म तारीख",
    status: "स्थिती",

    avgMilk: "सरासरी दूध",
    pregnancy: "गर्भधारणा",
    lastBreeding: "शेवटचे प्रजनन",
    age: "वय",

    totalMilk: "एकूण दूध",
    milkIncome: "दूध उत्पन्न",
    feedCost: "चारा खर्च",
    profit: "नफा",
    avgMilkPerDay: "दिवसाला सरासरी दूध",

    milkRecord: "दूध रेकॉर्ड",
    feedRecord: "चारा रेकॉर्ड",
    openMilkFeedPage: "दूध / चारा पेज उघडा",
    noMilkFeedRecords:
      "या जनावरासाठी अजून दूध / चारा रेकॉर्ड नाही.",

    milkYieldChartTitle:
      "दैनिक दूध (लि.)",
    dailyProfitChartTitle:
      "दैनिक नफा (₹)",

    date: "तारीख",
    morningLitres: "सकाळ (लि.)",
    eveningLitres: "संध्याकाळ (लि.)",
    totalLitres: "एकूण (लि.)",
    milkPricePerLitre: "दूध दर (₹/लि.)",
    feedType: "चारा प्रकार",
    qtyKg: "प्रमाण (कि.ग्रा.)",
    feedCostLabel: "चारा खर्च",

    breedingHistoryTitle:
      "प्रजनन इतिहास",
    noBreedingRecords:
      "या जनावरासाठी प्रजनन रेकॉर्ड नाही.",
    serviceDate: "सेवा तारीख",
    method: "पद्धत",
    pregnancyStatus: "गर्भधारणा स्थिती",
    expectedCalving:
      "अपेक्षित वासरू तारीख",
    actualCalving:
      "खरी वासरू तारीख",
    remarks: "टीप",

    healthRecordsTitle: "आरोग्य रेकॉर्ड",
    noHealthRecords:
      "या जनावरासाठी आरोग्य रेकॉर्ड नाही.",
    recordedOn: "रेकॉर्ड केलेली तारीख",
    vaccination: "लस",
    next: "पुढील",
    deworming: "कृमी नाशक",
    illness: "आजार",
    since: "पासून",
    severity: "तीव्रता",
    illnessRemarks: "आजार टिप",
    checkupDate: "तपासणी तारीख",
    checkupRemarks: "तपासणी टिप",

    dairyFarmManagementTitle:
      "डेअरी फार्म व्यवस्थापन",
    milkFeedRecordsTitle:
      "दूध / चारा रेकॉर्ड",

    failedToLoadCattle:
      "जनावर लोड करण्यात अयशस्वी",
    failedToLoadRecords:
      "रेकॉर्ड लोड करण्यात अयशस्वी",
    failedToSaveMilkFeed:
      "दूध / चारा रेकॉर्ड सेव्ह करण्यात अयशस्वी",
    serverErrorMilkFeed:
      "सर्व्हर त्रुटी, नंतर पुन्हा प्रयत्न करा",
    deleteFailedMilkFeed:
      "रेकॉर्ड काढताना त्रुटी",

    voiceNotSupported:
      "या ब्राउझरमध्ये व्हॉईस इनपुट सपोर्ट नाही",
    confirmDeleteRecord:
      "हा रेकॉर्ड काढून टाकायचा आहे का?",
    pleaseSelectCattleAndDate:
      "कृपया जनावर आणि तारीख निवडा",

    selectCattleLabel: "जनावर निवडा",
    milkPriceLabel: "दूध दर (₹ / लि.)",
    quantityKgPerDay:
      "प्रमाण (कि.ग्रा./दिवस)",
    costPerKg: "प्रति कि.ग्रा दर (₹)",
    dailyFeedCost:
      "दैनिक चारा खर्च (₹)",
    morningYield:
      "सकाळचे दूध (लि.)",
    eveningYield:
      "संध्याकाळचे दूध (लि.)",
    totalYield: "एकूण दूध (लि.)",
    runningCostLabel:
      "इतर दैनिक खर्च (₹)",
    earningsPerDay:
      "दिवसाला नफा (₹)",

    saving: "सेव्ह होत आहे...",
    updating: "अपडेट होत आहे...",
    saveRecordBtn:
      "💾 रेकॉर्ड सेव्ह करा",
    updateRecordBtn:
      "✏ रेकॉर्ड अपडेट करा",
    cancelEdit:
      "✖ संपादन रद्द करा",

    savedRecordsTitle:
      "सेव्ह केलेले रेकॉर्ड",
    selectedCattleSuffix:
      "निवडलेले जनावर",
    loadingRecords:
      "रेकॉर्ड लोड होत आहेत...",
    cattleColumn: "जनावर",
    qtyKgPerDayColumn:
      "प्रमाण (कि.ग्रा./दिवस)",
    costPerKgColumn:
      "दर/कि.ग्रा (₹)",
    feedCostColumn:
      "चारा खर्च (₹)",
    milkPriceColumn:
      "दूध दर (₹/लि.)",
    totalYieldColumn:
      "एकूण दूध (लि.)",
    earningsColumn:
      "नफा (₹/दिवस)",
    noRecordsForThisCattle:
      "या जनावरासाठी रेकॉर्ड नाही.",

    healthRecordTitle:
      "आरोग्य रेकॉर्ड",
    failedToLoadCattleList:
      "जनावरांची यादी लोड करण्यात अयशस्वी",
    pleaseSelectCattle:
      "कृपया जनावर निवडा.",
    healthRecordSaved:
      "आरोग्य रेकॉर्ड सेव्ह केले.",

    vaccinationSection:
      "लसीकरण",
    dewormingSection:
      "कृमी नाशक",
    illnessSection: "आजार माहिती",
    checkupSection: "तपासणी",

    vaccinationDate:
      "लस तारीख",
    nextVaccinationDate:
      "पुढील तारीख",
    dewormingDate:
      "कृमी नाशक तारीख",
    nextDewormingDate:
      "पुढील तारीख",
    illnessType: "आजार प्रकार",
    illnessOnsetDate:
      "आजार सुरू तारीख",
    severityLabel: "तीव्रता",
    severityMild: "हलका",
    severityModerate: "मध्यम",
    severitySevere: "जास्त",
    illnessRemarksLabel:
      "अतिरिक्त टिप",
    checkupDateLabel:
      "तपासणी तारीख",
    checkupRemarksLabel:
      "तपासणी टिप",
    saveHealthRecordBtn:
      "आरोग्य रेकॉर्ड सेव्ह करा",
    savingHealthRecord:
      "सेव्ह होत आहे...",

    failedToLoadBreedingRecords:
      "प्रजनन रेकॉर्ड लोड करण्यात अयशस्वी",
    failedToSaveBreedingRecord:
      "प्रजनन रेकॉर्ड सेव्ह करण्यात अयशस्वी",
    failedToDeleteBreeding:
      "प्रजनन रेकॉर्ड काढण्यात अयशस्वी",
    errorDeletingBreeding:
      "प्रजनन रेकॉर्ड काढताना त्रुटी",
    serverError: "सर्व्हर त्रुटी",
    selectCattleAndServiceDate:
      "कृपया जनावर आणि सेवा तारीख निवडा.",

    breedingRecordsTitle:
      "प्रजनन रेकॉर्ड",
    editBreedingRecordTitle:
      "प्रजनन रेकॉर्ड संपादन",
    addBreedingRecordTitle:
      "प्रजनन रेकॉर्ड जोडा",
    cattleLabel: "जनावर",
    selectCattle: "जनावर निवडा",
    selectPlaceholder: "निवडा",
    methodAI: "कृत्रिम गर्भाधान (AI)",
    methodNatural: "नैसर्गिक सेवा",
    methodOther: "इतर",

    pregStatusNotChecked:
      "तपासले नाही",
    pregStatusInseminated:
      "గर्भाधान झाले",
    pregStatusPregnant: "गर्भवती",
    pregStatusNotPregnant:
      "गर्भवती नाही",
    pregStatusAborted: "गर्भपात",
    pregStatusDelivered:
      "वासरू झाले",

    expectedCalvingDate:
      "अपेक्षित वासरू तारीख",
    expectedCalvingHint:
      "फक्त गर्भवती स्थितीत आपोआप भरले जाईल.",
    remarksPlaceholder:
      "डॉक्टर टिपा, हीट वर्तन, AI तपशील इ.",
    updatingBreeding:
      "अपडेट होत आहे...",
    savingBreeding: "सेव्ह होत आहे...",
    updateBreedingBtn:
      "प्रजनन रेकॉर्ड अपडेट करा",
    saveBreedingBtn:
      "प्रजनन रेकॉर्ड सेव्ह करा",
    selectCattleToViewBreeding:
      "प्रजनन इतिहास पाहण्यासाठी जनावर निवडा.",
    noBreedingRecordsForCattle:
      "या जनावरासाठी प्रजनन रेकॉर्ड नाही.",
    editRecordTitle: "रेकॉर्ड संपादन",
    deleteRecordTitle: "रेकॉर्ड काढा",

    noUserInfoFound:
      "युजर माहिती सापडली नाही.",
    farmerProfileTitle:
      "शेतकरी प्रोफाइल",
    farmerProfileSubtitle:
      "आपली वैयक्तिक आणि फार्म माहिती सोप्या पद्धतीने सांभाळा",
    tapToUploadPhoto:
      "फोटो अपलोड करण्यासाठी टॅप करा",
    profileNameLabel: "नाव:",
    profilePhoneLabel: "फोन:",
    profilePasswordLabel:
      "पासवर्ड:",
    changePasswordLabel:
      "पासवर्ड बदलाः",
    pleaseEnterNewPassword:
      "कृपया नवीन पासवर्ड टाका.",
    passwordUpdatedSuccess:
      "✅ पासवर्ड यशस्वीरित्या अपडेट झाला!",
    enterNewPasswordPlaceholder:
      "नवीन पासवर्ड टाका",
    updateButton: "अपडेट",
    totalCattleManagedTitle:
      "व्यवस्थापित एकूण जनावरे",
    suggestionTitle: "सूचना",
    suggestionBody:
      "रेकॉर्ड्स वेळेवर अपडेट केल्यास दूध उत्पादन, आरोग्य आणि खर्च यावर चांगले नियंत्रण ठेवता येते. कृपया जनावरांचे आरोग्य आणि चारा तपशील नियमित पाहा.",
  },
};

// default export (for `import translations from "./translations"`)
export default translations;
