# -*- mode: python ; coding: utf-8 -*-
import PyInstaller.config

PyInstaller.config.CONF['distpath'] = './desktop_client'

block_cipher = None

a = Analysis(['../ictrl_be.py'],
             pathex=['.'],
             binaries=[],
             datas=[('../client/build', './client')],
             hiddenimports=[],
             hookspath=[],
             hooksconfig={},
             runtime_hooks=[],
             excludes=[
                 'algraph',
                 'future',
                 'libfuturize',
                 'pasteurize',
                 'ordlookup',
                 'pefile',
                 'past',
                 'pip',
                 'pkg_resources',
                 'pycparser',
                 'pyinstaller',
                 'wheel',
                 'win32ctypes',
                 'setuptools',
                 # numpy unused
                 "numpy.array_api", "numpy._typing", "numpy.distutils", "numpy.doc", "numpy.f2py", "numpy.testing",
                 "numpy.tests", "numpy.typing",
                 # PIL unused
                 "PIL.__main__", "PIL.BdfFontFile", "PIL.BlpImagePlugin", "PIL.BufrStubImagePlugin", "PIL.ContainerIO",
                 "PIL.CurImagePlugin", "PIL.DcxImagePlugin", "PIL.DdsImagePlugin", "PIL.EpsImagePlugin", "PIL.ExifTags",
                 "PIL.features", "PIL.FitsImagePlugin", "PIL.FitsStubImagePlugin", "PIL.FliImagePlugin", "PIL.FontFile",
                 "PIL.FpxImagePlugin", "PIL.FtexImagePlugin", "PIL.GbrImagePlugin", "PIL.GdImageFile",
                 "PIL.GribStubImagePlugin", "PIL.Hdf5StubImagePlugin", "PIL.IcnsImagePlugin", "PIL.IcoImagePlugin",
                 "PIL.ImageCms", "PIL.ImageDraw2", "PIL.ImageEnhance", "PIL.ImageFilter", "PIL.ImageGrab",
                 "PIL.ImageMath", "PIL.ImageMorph", "PIL.ImagePath", "PIL.ImageQt",
                 "PIL.ImageShow", "PIL.ImageStat", "PIL.ImageTk", "PIL.ImageTransform", "PIL.ImageWin",
                 "PIL.ImImagePlugin", "PIL.ImtImagePlugin", "PIL.IptcImagePlugin", "PIL.Jpeg2KImagePlugin",
                 "PIL.McIdasImagePlugin", "PIL.MicImagePlugin", "PIL.MpegImagePlugin", "PIL.MpoImagePlugin",
                 "PIL.MspImagePlugin", "PIL.PalmImagePlugin", "PIL.PcdImagePlugin", "PIL.PcfFontFile",
                 "PIL.PcxImagePlugin", "PIL.PdfImagePlugin", "PIL.PdfParser", "PIL.PixarImagePlugin",
                 "PIL.PsdImagePlugin", "PIL.PSDraw", "PIL.PyAccess", "PIL.SgiImagePlugin", "PIL.SpiderImagePlugin",
                 "PIL.SunImagePlugin", "PIL.TarIO", "PIL.TgaImagePlugin", "PIL.WalImageFile", "PIL.WebPImagePlugin",
                 "PIL.WmfImagePlugin", "PIL.XbmImagePlugin", "PIL.XpmImagePlugin", "PIL.XVThumbImagePlugin",
             ],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)

pyz = PYZ(a.pure, a.zipped_data,
          cipher=block_cipher)

exe = EXE(pyz,
          a.scripts,
          [],
          exclude_binaries=True,
          name='ictrl_be',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=False,
          console=True,
          disable_windowed_traceback=False,
          argv_emulation=False,
          target_arch=None,
          codesign_identity=None,
          entitlements_file=None)

coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               upx_exclude=[],
               name='ictrl_be')