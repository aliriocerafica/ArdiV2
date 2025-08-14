// IT Department Basic Troubleshooting Guide Knowledge
// Classification: Internal-Only

export interface ITTroubleshootingEntry {
  id: string;
  category: string;
  title: string;
  content: string;
  tableContent?: string;
  keywords: string[];
  triggers: string[];
  priority: 'high' | 'medium' | 'low';
  lastUpdated: string;
}

export const itTroubleshootingKnowledge: ITTroubleshootingEntry[] = [
  {
    id: 'dropbox-not-responding',
    category: 'Dropbox',
    title: 'Dropbox Not Responding or Frozen',
    content: `## 🚫 Dropbox Not Responding or Frozen

**How to fix Dropbox when it's not responding?**

### Step-by-Step Solutions:

#### 1. **Force Close Dropbox**
- Press Ctrl+Alt+Delete (Windows) or Cmd+Option+Esc (Mac)
- Select "Task Manager" (Windows) or "Force Quit" (Mac)
- Find "Dropbox" in the list and end the process
- Restart Dropbox from your programs menu

#### 2. **Restart Dropbox Application**
- Right-click on the Dropbox icon in your system tray/menu bar
- Select "Quit Dropbox" or "Exit"
- Wait 30 seconds
- Reopen the application from your programs menu

#### 3. **Check System Resources**
- Open Task Manager (Ctrl+Shift+Esc)
- Check if Dropbox is using excessive CPU or memory
- Close other applications if system is overloaded

#### 4. **Reset Dropbox Cache**
- Open Dropbox preferences
- Click on "Account"
- Select "Unlink This Device" (your files won't be deleted)
- Sign back in to your account

### Common "Not Responding" Issues:
- **Application frozen** - Force close and restart
- **High CPU usage** - Check system resources
- **Memory issues** - Restart computer if needed
- **Corrupted cache** - Reset Dropbox cache

### Quick Fixes:
- **Force close** - End process and restart
- **Restart computer** - Clear memory and processes
- **Reset cache** - Unlink and relink device`,
    keywords: ['dropbox not responding', 'dropbox frozen', 'dropbox not working', 'dropbox stuck', 'dropbox crash', 'dropbox', 'frozen', 'stuck', 'crash', 'not responding', 'not working'],
    triggers: ['dropbox is not responding', 'dropbox not responding', 'dropbox frozen', 'dropbox stuck', 'dropbox not working', 'dropbox crash'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'dropbox-syncing-issues',
    category: 'Dropbox',
    title: 'Dropbox Files Not Syncing',
    content: `## 📁 Dropbox Files Not Syncing

**How to fix Dropbox syncing issues?**

### Step-by-Step Solutions:

#### 1. **Check Connection Status**
- Verify that your internet connection is working
- Look for the Dropbox icon in your system tray/menu bar to confirm it's connected

#### 2. **Restart Dropbox Application**
- Right-click on the Dropbox icon in your system tray/menu bar
- Select "Quit Dropbox" or "Exit"
- Reopen the application from your programs menu

#### 3. **Check Storage Space**
- Ensure you have sufficient storage space on both your device and your Dropbox account
- Free up space if necessary

#### 4. **Selective Sync Issues**
- Open Dropbox preferences/settings
- Go to "Sync" or "Selective Sync"
- Verify the folders you need are selected for syncing

### Common Error Messages:
- "You don't have permission to access this file"
- "Sync paused" or "Sync stopped"
- "Storage full" warnings

### Quick Fixes:
- **Restart Dropbox** - Most common solution
- **Check internet** - Ensure stable connection
- **Verify permissions** - Check file/folder access rights`,
    keywords: ['dropbox', 'syncing', 'files not syncing', 'dropbox sync', 'file sync issues', 'sync', 'files', 'syncing', 'not syncing', 'sync issues'],
    triggers: ['dropbox not syncing', 'files not syncing', 'dropbox sync issues', 'dropbox files not updating', 'dropbox sync problems'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'dropbox-access-denied',
    category: 'Dropbox',
    title: 'Dropbox File Access Denied or Locked',
    content: `## 🔒 Dropbox File Access Denied or Locked

**How to fix Dropbox access denied issues?**

### Step-by-Step Solutions:

#### 1. **Close Applications Using the File**
- Make sure no applications have the file open
- Check for temporary lock files (files with ~ or .lock extension)

#### 2. **Reset Dropbox Cache**
- Open Dropbox preferences
- Click on "Account"
- Select "Unlink This Device" (don't worry, your files won't be deleted)
- Sign back in to your account

#### 3. **Permission Issues**
- Right-click on the folder having issues
- Check "Properties" or "Get Info"
- Verify you have correct read/write permissions
- Common error message: "You don't have permission to access this file"

### Common Error Messages:
- "Access denied"
- "File is locked"
- "Permission denied"
- "You don't have permission to access this file"

### Quick Fixes:
- **Close applications** - Ensure no programs are using the file
- **Reset cache** - Unlink and relink device
- **Check permissions** - Verify file/folder access rights`,
    keywords: ['dropbox access denied', 'file locked', 'permission denied', 'dropbox permissions', 'file access issues', 'access', 'denied', 'locked', 'permission', 'permissions', 'file access'],
    triggers: ['dropbox access denied', 'file locked dropbox', 'permission denied dropbox', 'dropbox file access', 'dropbox locked files'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'ringcentral-audio-issues',
    category: 'RingCentral',
    title: 'RingCentral Audio Quality Problems',
    content: `## 🎤 RingCentral Audio Quality Problems

**How to fix RingCentral audio issues?**

### Step-by-Step Solutions:

#### 1. **Check Network Connection**
- Test your internet speed at [speedtest.net](https://www.speedtest.net/)
- Ensure you have at least 100 Kbps upload/download for voice calls
- Consider using a wired connection instead of Wi-Fi

#### 2. **Audio Device Issues**
- Verify correct headset/microphone is selected in RingCentral settings
- Check physical connections and ensure devices are not muted
- Test your microphone and speakers in your device's sound settings

#### 3. **Restart the Application**
- Completely close RingCentral
- Reopen and test again

### Common Audio Problems:
- **Echo** - Use headphones instead of speakers
- **Static/Noise** - Check microphone connections
- **Low Volume** - Adjust system and app volume settings
- **No Audio** - Verify device selection in settings

### Quick Fixes:
- **Restart RingCentral** - Close and reopen the application
- **Check device settings** - Verify correct microphone/speakers selected
- **Test network** - Ensure stable internet connection`,
    keywords: ['ringcentral audio', 'audio quality', 'microphone issues', 'ringcentral sound', 'audio problems', 'audio', 'microphone', 'sound', 'quality', 'echo', 'noise', 'volume'],
    triggers: ['ringcentral audio problems', 'audio quality issues', 'microphone not working', 'ringcentral sound issues', 'audio echo'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'ringcentral-call-issues',
    category: 'RingCentral',
    title: 'RingCentral Unable to Make or Receive Calls',
    content: `## 📞 RingCentral Call Issues

**How to fix RingCentral call problems?**

### Step-by-Step Solutions:

#### 1. **Check RingCentral Status**
- Verify you're logged in
- Check if you're in "Do Not Disturb" mode
- Ensure your call handling & forwarding rules are set correctly

#### 2. **Test with RingCentral Phone Web**
- Try using the web browser version to see if the issue is with the app
- Go to [https://phone.ringcentral.com](https://phone.ringcentral.com)

#### 3. **Verify Phone Number Settings**
- Check if your extension settings are correct
- Verify outbound caller ID settings

### Common Call Problems:
- **Can't make calls** - Check login status and DND mode
- **Can't receive calls** - Verify call forwarding settings
- **Call drops** - Check network stability
- **No dial tone** - Test with web version

### Quick Fixes:
- **Restart RingCentral** - Close and reopen the application
- **Check web version** - Test if issue is app-specific
- **Verify settings** - Check extension and caller ID settings`,
    keywords: ['ringcentral calls', 'make calls', 'receive calls', 'call issues', 'ringcentral phone', 'calls', 'call', 'phone', 'dial', 'dialing', 'receive', 'make'],
    triggers: ['ringcentral can\'t make calls', 'can\'t receive calls', 'call problems', 'ringcentral call issues', 'phone not working'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'goto-connection-issues',
    category: 'GoTo',
    title: 'GoTo Connection Problems',
    content: `## 🔗 GoTo Connection Problems

**How to fix GoTo connection issues?**

### Step-by-Step Solutions:

#### 1. **System Requirements Check**
- Verify your device meets the minimum system requirements
- Update your browser to the latest version if using GoTo web app

#### 2. **Network Troubleshooting**
- Test on a different network if possible
- Disable VPN temporarily (if applicable)
- Check firewall settings to ensure GoTo is not blocked

#### 3. **Clear Browser Cache** (for web app)
- Open browser settings
- Find "Clear browsing data" option
- Select cookies and cache to clear

### Common Connection Issues:
- **Can't join meeting** - Check meeting ID and password
- **Connection drops** - Test network stability
- **Slow connection** - Check internet speed
- **Blocked by firewall** - Verify firewall settings

### Quick Fixes:
- **Restart GoTo** - Close and reopen the application
- **Clear cache** - Clear browser cache for web version
- **Check network** - Test on different network if possible`,
    keywords: ['goto connection', 'meeting connection', 'goto issues', 'connection problems', 'goto meeting', 'goto', 'meeting', 'connection', 'join', 'meetings', 'connect'],
    triggers: ['goto connection problems', 'can\'t join meeting', 'goto connection issues', 'meeting connection problems', 'goto not working'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'outlook-email-issues',
    category: 'Outlook',
    title: 'Outlook Email Not Sending or Receiving',
    content: `## 📧 Outlook Email Issues

**How to fix Outlook email problems?**

### Step-by-Step Solutions:

#### 1. **Check Connection Status**
- Verify your internet connection
- Look for "Working Offline" mode in Outlook and disable it if enabled

#### 2. **Restart Outlook**
- Close Outlook completely
- Wait 30 seconds
- Reopen the application

#### 3. **Check Server Settings**
- Go to Account Settings
- Verify incoming and outgoing server information is correct
- Test account settings using the built-in test feature

#### 4. **Outlook Data File Issues**
- Run "Repair" on your Outlook data file
- Go to Account Settings > Data Files > select your data file > Settings > Data File Settings > Compact Now

### Common Email Problems:
- **Emails not sending** - Check server settings and connection
- **Emails not receiving** - Verify account settings
- **Outlook slow** - Check file size and add-ins
- **Sync issues** - Restart Outlook and check connection

### Quick Fixes:
- **Restart Outlook** - Close and reopen the application
- **Check connection** - Ensure internet is working
- **Test account** - Use built-in account test feature`,
    keywords: ['outlook email', 'email not sending', 'email not receiving', 'outlook issues', 'email problems', 'email', 'outlook', 'send', 'receive', 'mail', 'sending', 'receiving'],
    triggers: ['outlook email not working', 'can\'t send emails', 'can\'t receive emails', 'outlook email issues', 'email problems outlook'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'windows-slow-performance',
    category: 'Windows',
    title: 'Windows Slow Computer Performance',
    content: `## 🐌 Windows Slow Performance

**How to fix slow computer performance?**

### Step-by-Step Solutions:

#### 1. **Check for Resource-Intensive Programs**
- Press Ctrl+Shift+Esc to open Task Manager
- Look under the "Processes" tab for applications using high CPU, Memory, or Disk
- Close unnecessary applications

#### 2. **Disk Cleanup**
- Search for "Disk Cleanup" in the Start menu
- Select the drive to clean (usually C:)
- Check boxes for temporary files, recycle bin, etc.
- Click "Clean up system files" for more options

#### 3. **Defragment Hard Drive** (for non-SSD drives only)
- Search for "Defragment" in the Start menu
- Select your hard drive and click "Optimize"

#### 4. **Manage Startup Programs**
- Open Task Manager (Ctrl+Shift+Esc)
- Go to the "Startup" tab
- Disable programs you don't need to start automatically

### Common Performance Issues:
- **High CPU usage** - Check Task Manager for resource-heavy programs
- **Low memory** - Close unnecessary applications
- **Slow startup** - Disable unnecessary startup programs
- **Disk space full** - Run disk cleanup

### Quick Fixes:
- **Restart computer** - Perform full system restart
- **Close programs** - End unnecessary applications
- **Clean disk** - Run disk cleanup utility`,
    keywords: ['windows slow', 'computer slow', 'performance issues', 'slow computer', 'windows performance', 'slow', 'computer', 'performance', 'speed', 'fast', 'slowly', 'lag'],
    triggers: ['computer is slow', 'windows slow', 'computer performance', 'slow computer', 'windows performance issues'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'windows-network-issues',
    category: 'Windows',
    title: 'Windows Network Connectivity Issues',
    content: `## 🌐 Windows Network Issues

**How to fix Windows network problems?**

### Step-by-Step Solutions:

#### 1. **Run Network Troubleshooter**
- Go to Settings > Network & Internet > Status
- Click "Network troubleshooter"

#### 2. **Reset Network**
- Go to Settings > Network & Internet > Status
- Click "Network reset" at the bottom

#### 3. **Check Network Adapter**
- Right-click Start button > Device Manager
- Expand "Network adapters"
- Right-click your adapter > Disable
- Right-click again > Enable

#### 4. **IP Configuration Reset**
- Open Command Prompt as administrator
- Type "ipconfig /release" and press Enter
- Type "ipconfig /flushdns" and press Enter
- Type "ipconfig /renew" and press Enter

### Common Network Problems:
- **No internet connection** - Check router and cables
- **Slow internet** - Test connection speed
- **Wi-Fi not connecting** - Reset network adapter
- **DNS issues** - Flush DNS cache

### Quick Fixes:
- **Restart router** - Power cycle your router
- **Reset network** - Use Windows network reset
- **Check cables** - Verify physical connections`,
    keywords: ['windows network', 'internet connection', 'network issues', 'wi-fi problems', 'network connectivity', 'network', 'internet', 'wifi', 'wi-fi', 'connection', 'connect', 'online'],
    triggers: ['no internet connection', 'network not working', 'wi-fi not connecting', 'network issues', 'internet problems'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'general-troubleshooting',
    category: 'General',
    title: 'General Troubleshooting Steps',
    content: `## 🔧 General Troubleshooting Steps

**What are the general troubleshooting steps for most issues?**

### Universal Troubleshooting Process:

#### 1. **Restart the Application**
- Close and reopen the program
- This resolves most software issues

#### 2. **Restart Your Computer**
- Save all work and perform a full system restart
- Clears memory and resolves many system issues

#### 3. **Check for Updates**
- Ensure the application is running the latest version
- Update your operating system if needed

#### 4. **Clear Cache and Temporary Files**
- For web applications, clear browser cache
- For desktop applications, look for cache clearing options in settings

#### 5. **Check System Resources**
- Open Task Manager (Windows) or Activity Monitor (Mac)
- Check if your system has sufficient available memory and CPU

#### 6. **Reinstall the Application**
- Uninstall the application
- Download the latest version from the official website
- Reinstall and reconfigure settings

### Common Error Messages:
- **"Application not responding"** - Restart the application
- **"Out of memory"** - Close other programs or restart
- **"Connection failed"** - Check internet and restart
- **"Access denied"** - Check permissions or run as administrator

### Quick Fixes:
- **Restart first** - Try restarting before other solutions
- **Check updates** - Ensure software is current
- **Clear cache** - Remove temporary files`,
    keywords: ['general troubleshooting', 'troubleshooting steps', 'fix problems', 'common solutions', 'troubleshooting guide', 'troubleshooting', 'fix', 'problem', 'solution', 'help', 'guide', 'steps'],
    triggers: ['troubleshooting steps', 'how to fix', 'general troubleshooting', 'common solutions', 'fix problems'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'application-not-responding',
    category: 'General',
    title: 'Application Not Responding or Frozen',
    content: `## 🚫 Application Not Responding or Frozen

**How to fix applications that are not responding?**

### Step-by-Step Solutions:

#### 1. **Force Close the Application**
- Press Ctrl+Alt+Delete (Windows) or Cmd+Option+Esc (Mac)
- Select "Task Manager" (Windows) or "Force Quit" (Mac)
- Find the problematic application in the list
- Click "End Task" (Windows) or select and click "Force Quit" (Mac)

#### 2. **Restart the Application**
- After force closing, wait 30 seconds
- Reopen the application from your programs menu
- Check if the issue persists

#### 3. **Check System Resources**
- Open Task Manager (Ctrl+Shift+Esc)
- Check CPU and Memory usage
- Close other applications if system is overloaded
- Restart computer if necessary

#### 4. **Update the Application**
- Check for available updates
- Download and install the latest version
- Restart the application after updating

### Common "Not Responding" Applications:
- **Dropbox** - Force close and restart
- **Outlook** - End process and reopen
- **RingCentral** - Force quit and restart
- **Web browsers** - Close all tabs and restart
- **Microsoft Office** - End task and reopen

### Quick Fixes:
- **Force close** - End process and restart
- **Restart computer** - Clear memory and processes
- **Check updates** - Install latest version
- **Close other apps** - Free up system resources`,
    keywords: ['application not responding', 'app frozen', 'program not working', 'application stuck', 'app crash', 'application', 'app', 'program', 'frozen', 'stuck', 'crash', 'not responding', 'not working'],
    triggers: ['not responding', 'application not responding', 'app frozen', 'program not working', 'application stuck', 'app crash', 'frozen'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'outlook-not-responding',
    category: 'Outlook',
    title: 'Outlook Not Responding or Frozen',
    content: `## 🚫 Outlook Not Responding or Frozen

**How to fix Outlook when it's not responding?**

### Step-by-Step Solutions:

#### 1. **Force Close Outlook**
- Press Ctrl+Alt+Delete
- Select "Task Manager"
- Find "Outlook" in the processes list
- Click "End Task"

#### 2. **Restart Outlook in Safe Mode**
- Hold Ctrl key while opening Outlook
- Select "Yes" when prompted to start in Safe Mode
- Test if the issue persists in Safe Mode

#### 3. **Check Outlook Data File**
- Go to File > Account Settings > Data Files
- Select your data file and click "Settings"
- Click "Data File Settings" > "Compact Now"

#### 4. **Disable Add-ins**
- Go to File > Options > Add-ins
- Disable all add-ins temporarily
- Restart Outlook and test

### Common Outlook Issues:
- **High CPU usage** - Check for large attachments or corrupted data
- **Memory problems** - Compact data file
- **Add-in conflicts** - Disable problematic add-ins
- **Corrupted profile** - Create new Outlook profile

### Quick Fixes:
- **Force close** - End Outlook process
- **Safe mode** - Start Outlook in safe mode
- **Compact data** - Reduce file size
- **Disable add-ins** - Remove conflicting add-ins`,
    keywords: ['outlook not responding', 'outlook frozen', 'outlook stuck', 'outlook crash', 'outlook not working', 'outlook', 'frozen', 'stuck', 'crash', 'not responding', 'not working'],
    triggers: ['outlook is not responding', 'outlook not responding', 'outlook frozen', 'outlook stuck', 'outlook crash'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'ringcentral-not-responding',
    category: 'RingCentral',
    title: 'RingCentral Not Responding or Frozen',
    content: `## 🚫 RingCentral Not Responding or Frozen

**How to fix RingCentral when it's not responding?**

### Step-by-Step Solutions:

#### 1. **Force Close RingCentral**
- Press Ctrl+Alt+Delete (Windows) or Cmd+Option+Esc (Mac)
- Select "Task Manager" (Windows) or "Force Quit" (Mac)
- Find "RingCentral" in the processes list
- End the process

#### 2. **Restart RingCentral**
- Wait 30 seconds after force closing
- Reopen RingCentral from your programs menu
- Sign in again

#### 3. **Clear RingCentral Cache**
- Close RingCentral completely
- Navigate to RingCentral cache folder (varies by OS)
- Delete cache files
- Restart RingCentral

#### 4. **Check System Resources**
- Open Task Manager (Ctrl+Shift+Esc)
- Check if RingCentral is using excessive resources
- Close other applications if needed

### Common RingCentral Issues:
- **Audio problems** - Check microphone and speaker settings
- **Connection issues** - Verify internet connection
- **Login problems** - Clear cache and restart
- **Call quality** - Check network stability

### Quick Fixes:
- **Force close** - End process and restart
- **Clear cache** - Remove temporary files
- **Restart computer** - Clear all processes
- **Check network** - Ensure stable connection`,
    keywords: ['ringcentral not responding', 'ringcentral frozen', 'ringcentral stuck', 'ringcentral crash', 'ringcentral', 'frozen', 'stuck', 'crash', 'not responding'],
    triggers: ['ringcentral is not responding', 'ringcentral not responding', 'ringcentral frozen', 'ringcentral stuck'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'it-support-contact',
    category: 'IT Support',
    title: 'Contacting IT Support',
    content: `## 🆘 Contacting IT Support

**How to contact IT Support?**

### IT Support Contact Information:

#### **Primary Contact Methods:**
- **IT Help Desk:** 09217488822
- **Email:** it@ardentparalegal.com
- **Slack:** ardent channel

#### **IT Support Hours:**
- **Daily:** 10:00 PM - 7:00 AM
- For assistance outside these hours, please submit a ticket through the support portal

### When Reporting an Issue, Please Provide:

#### 1. **Application Information**
- Application name and version
- Operating system version

#### 2. **Problem Description**
- Detailed description of the problem
- When the issue started occurring
- Steps to reproduce the issue

#### 3. **Troubleshooting Steps**
- Steps you've already taken to resolve it
- Any error messages received

#### 4. **Additional Information**
- Screenshots of any error messages (if applicable)
- Best time to reach you for assistance

### Common Issue Categories:
- **Connection Issues:** network, internet, Wi-Fi, ethernet, VPN, proxy
- **Application Errors:** crash, freeze, hang, not responding, blue screen
- **Account Issues:** login, password, authentication, credentials, access denied
- **Hardware Problems:** printer, scanner, display, keyboard, mouse, headset
- **Software Updates:** patch, upgrade, version, compatibility, installation

### Before Contacting Support:
1. **Try basic troubleshooting** - Restart application/computer
2. **Check for updates** - Ensure software is current
3. **Document the issue** - Note error messages and steps taken
4. **Gather information** - Have application names and versions ready`,
    keywords: ['it support', 'contact it', 'help desk', 'technical support', 'it contact', 'support', 'help', 'contact', 'it', 'desk', 'technical'],
    triggers: ['contact it support', 'it help desk', 'technical support', 'it contact', 'help desk number', 'it support contact'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  }
];

export function findITTroubleshootingKnowledge(userMessage: string): ITTroubleshootingEntry | null {
  const message = userMessage.toLowerCase();
  
  for (const entry of itTroubleshootingKnowledge) {
    for (const trigger of entry.triggers) {
      if (message.includes(trigger.toLowerCase())) {
        return entry;
      }
    }
  }
  
  return null;
} 