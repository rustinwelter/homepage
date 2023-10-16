---
title: Deleting PowerShell History
description: In this post, I will be explaining how to have your history deleted in PowerShell
postDate: 2023-10-07
readTime: 1
---

You can get the path of the txt file with the history by

```powershell
(Get-PSReadlineOption).HistorySavePath
```

In order to delete history, either delete the file using explorer or just type

```powershell
del (Get-PSReadlineOption).HistorySavePath
```

To disable logging, use

```powershell
Set-PSReadlineOption –HistorySaveStyle SaveNothing
```

PowerShell can only retain changes for a session. For this reason, if you want to have your changes saved, there is a

```powershell
$profile
```

This is a path for a script that runs at the beginning of every session. There will not be a file at default so you will have to create it using the command

```powershell
New-Item $profile -force -type file
```

Then open the file and write the same command above and you're done! :)
