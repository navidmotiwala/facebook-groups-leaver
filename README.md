# 🚪 Facebook Groups Leaver

A Chrome extension to help you leave Facebook groups using a floating Start/Stop panel.

## 📥 Installation
1. Unzip this folder.
2. Open chrome://extensions and turn on **Developer mode** (top right).
3. Click **"Load unpacked"** and select the unzipped folder.
4. Open facebook.com/groups/joins/ and refresh.
5. Use the red panel at the bottom right: set a number, click **Start**.

## 💡 Tips
- Do batches of 10, a few minutes apart. Refresh between batches.
- It leaves groups from the top of the list. Leave the ones you want to keep... or leave them manually after.
- If Facebook blocks you temporarily, wait a day.
- If it says **"Menu item not found"**, Facebook changed its layout; the selectors in content.js need updating.

## ⚠️ Limitations and Safety

- This is an unofficial Chrome extension and is not affiliated with Facebook.
- Review the groups before starting. Leaving a group may affect your access to its content.
- Facebook's interface can change, which may cause the extension to stop working.
- Automated actions may be restricted under Facebook's rules.

## 🛠️ Version 1.1
Groups whose `...` menu has no **Leave group** option are skipped instead of stopping the script.
To leave skipped groups manually, open the group and select **Joined → Leave group**.

## 📄 License
MIT License.
