import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    settingPopup: false,
    addBookPopup: false,
    readBookPopUp: false,
    recordBookPopup: false,
    addNewAdminPopup: false,
    returnBookPopup:false,
  },

  reducers: {
  
    toggleSettingPopup(state) {
      state.settingPopup = !state.settingPopup;
    },

    
    toggleAddBookPopup(state) {
      state.addBookPopup = !state.addBookPopup;
    },

   
    toggleReadBookPopup(state) {
      state.readBookPopUp = !state.readBookPopUp;
    },

    
    toggleRecordBookPopup(state) {
      state.recordBookPopup = !state.recordBookPopup;
    },

  
    toggleAddNewAdminPopup(state) {
      state.addNewAdminPopup = !state.addNewAdminPopup;
    },

    toggleReturnBookPopup(state) {
      state.returnBookPopup = !state.returnBookPopup;
    },

    
    closeAllPopups(state) {
      state.settingPopup = false;
      state.addBookPopup = false;
      state.readBookPopUp = false;
      state.recordBookPopup = false;
      state.addNewAdminPopup = false;
      state.returnBookPopup= false;
    }
  },
});

export const {
  toggleSettingPopup,
  toggleAddBookPopup,
  toggleReadBookPopup,
  toggleRecordBookPopup,
  toggleAddNewAdminPopup,
  toggleReturnBookPopup,
  closeAllPopups,
} = popupSlice.actions;

export default popupSlice.reducer;
