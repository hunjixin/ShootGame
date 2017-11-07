import events from 'events'
import fs from 'fs'
/**
 * dosheader
 */
class DosHeader {
  constructor (buffer) {
    this.startOffset = 0
    var offset = 0
    this.e_magic = buffer.toString('ascii', 0, 2)
    offset = offset + 2
    this.e_cblp = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_cp = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_crlc = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_cparhdr = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_minalloc = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_maxalloc = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_ss = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_sp = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_csum = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_ip = buffer.readUInt16LE(offset)
    offset = offset + 16
    this.e_cs = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_lfarlc = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_ovno = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_res = []
    for (var i = 0;i < 4;i++) {
      this.e_res.push(buffer.readUInt16LE(offset))
      offset = offset + 2
    }
    this.e_oemic = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_oemidnfo = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.e_res2 = []
    for (var i = 0;i < 10;i++) {
      this.e_res2.push(buffer.readUInt16LE(offset))
      offset = offset + 2
    }
    this.e_lfanew = buffer.readUInt32LE(offset)
    offset = offset + 2

    this.length = offset
  }
}
/**
 * coffHeader
 */
class COFFHeader {
  constructor (buffer, offset) {
    this.startOffset = offset
    this.machine = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.numberOfSections = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.timeDateStamp = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.poUInterToSymbolTable = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.numberOfSymbols = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.sizeOfOptionHeader = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.characteristics = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.length = offset - startOffset
  }
  isX64 () {
    return this.machine == 'x64'
  }
}
/**
 * optionalHeader
 */
class OptionalHeader {
  constructor (buffer, offset, coffheader) {
    this.startOffset = offset
    this.signature = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.majorLinkerVersion = buffer.readUInt8(offset)
    offset = offset + 1
    this.minorLinkerVersion = buffer.readUInt8(offset)
    offset = offset + 1
    this.sizeOfCode = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.sizeOfInitializedData = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.sizeOfUninitializedData = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.addressOfEntryPoint = buffer.readUInt32LE(offset)
    offset = offset + 4

    this.baseOfCode = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.baseOfData = buffer.readUInt32LE(offset)
    offset = offset + 4
    /*The next 21 fields are an extension to the COFF optional header format*/
    if (coffheader.isX64()) {
      this.imageBase = buffer.readUInt64LE(offset)
      offset = offset + 8
    }else {
      this.imageBase = buffer.readUInt32LE(offset)
      offset = offset + 4
    }

    this.sectionAlignment = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.fileAlignment = buffer.readUInt32LE(offset)
    offset = offset + 4

    this.majorOperatingSystemVersion = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.minorOpratingSystemVersion = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.majorImageVersion = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.minorImageVersion = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.majorSubSystemVersion = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.minorSubSystemVersion = buffer.readUInt16LE(offset)
    offset = offset + 2

    this.win32VersionValue = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.sizeOfImage = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.sizeOfHeaders = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.checkSUm = buffer.readUInt32LE(offset)
    offset = offset + 4

    this.sumsystem = buffer.readUInt16LE(offset)
    offset = offset + 2
    this.dllCharacteristics = buffer.readUInt16LE(offset)
    offset = offset + 2

    if (coffheader.isX64()) {
      this.sizeOfStackReserve = buffer.readUInt64LE(offset)
      offset = offset + 8
      this.sizeOfStackCommit = buffer.readUInt64LE(offset)
      offset = offset + 8
      this.sizeOfHeapReserve = buffer.readUInt64LE(offset)
      offset = offset + 8
      this.sizeOfHeadCommit = buffer.readUInt64LE(offset)
      offset = offset + 8
    }else {
      this.sizeOfStackReserve = buffer.readUInt32LE(offset)
      offset = offset + 4
      this.sizeOfStackCommit = buffer.readUInt32LE(offset)
      offset = offset + 4
      this.sizeOfHeapReserve = buffer.readUInt32LE(offset)
      offset = offset + 4
      this.sizeOfHeadCommit = buffer.readUInt32LE(offset)
      offset = offset + 4
    }

    this.loaderFlags = buffer.readUInt32LE(offset)
    offset = offset + 4
    this.numberOfRvaAndSizes = buffer.readUInt32LE(offset)
    offset = offset + 4

    this.dataDirectory = [ ]
      offset = readDataDirectory(buffer, offset)

      this.length = offset - this.startOffset
    }
    readDataDirectory (buffer, offset) {
      var virtualAddress
      var size = buffer
      var innerReader = () => {
        virtualAddress = buffer.readUInt32LE(offset)
        offset = offset + 4
        size = buffer.readUInt32LE(offset)
        offset = offset + 4
      }
      // exportTable
      innerReader()
      this.dataDirectory.push({exportTable: virtualAddress,sizeOfExportTable: size})
      // exportTable
      innerReader()
      this.dataDirectory.push({exportTable: virtualAddress,sizeOfExportTable: size})
      // importTable
      innerReader()
      this.dataDirectory.push({importTable: virtualAddress,sizeOfImportTable: size})
      // resourceTable
      innerReader()
      this.dataDirectory.push({resourceTable: virtualAddress,sizeOfResourceTable: size})
      // exceptionTable
      innerReader()
      this.dataDirectory.push({exceptionTable: virtualAddress,sizeOfExceptionTable: size})
      // CertificateTable
      innerReader()
      this.dataDirectory.push({certificateTable: virtualAddress,sizeOfCertificateTable: size})
      // BaseRelocationTable
      innerReader()
      this.dataDirectory.push({baseRelocationTable: virtualAddress,sizeOfBaseRelocationTable: size})
      // Debug
      innerReader()
      this.dataDirectory.push({debug: virtualAddress,sizeOfDebug: size})
      // ArchitectureData
      innerReader()
      this.dataDirectory.push({architectureData: virtualAddress,sizeOfArchitectureData: size})
      // GlobalPtr
      innerReader()
      this.dataDirectory.push({globalPtr: virtualAddress,sizeOfGlobalPtr: size})
      // TLSTable
      innerReader()
      this.dataDirectory.push({TLSTable: virtualAddress,sizeOfTLSTable: size})
      // loadConfigTable
      innerReader()
      this.dataDirectory.push({loadConfigTable: virtualAddress,sizeOfLoadConfigTable: size})
      // BoundImport
      innerReader()
      this.dataDirectory.push({boundImport: virtualAddress,sizeOfBoundImport: size})
      // ImportAddressTable
      innerReader()
      this.dataDirectory.push({importAddressTable: virtualAddress,sizeOfImportAddressTable: size})
      // DelayImportDescriptor
      innerReader()
      this.dataDirectory.push({delayImportDescriptor: virtualAddress,sizeOfDelayImportDescriptor: size})
      // CLRRuntimeHeader
      innerReader()
      this.dataDirectory.push({CLRRuntimeHeader: virtualAddress,sizeOfCLRRuntimeHeader: size})
      return offset
    }
  }
  /**
   * peHeader
   */
  class PEHeader {
    constructor (buffer, offset) {
      this.startOffset = offset

      this.signature = buffer.readUInt32LE(offset)
      offset = offset + 32

      this.coffHeader = new COFFHeader(buffer, offset)
      offset = offset + this.coffHeader.length

      this.optionHeader = new OptionalHeader(buffer, offset, coffheader)
      offset = offset + this.optionHeader.length

      this.sectionHeader = new SectionHeader(buffer, offset)
      offset = offset + this.sectionHeader.length

      this.length = offset - this.startOffset
    }
  }
  /**
   * sectionHeader
   */
  class SectionHeader {
    constructor (buffer, offset) {
      this.startOffset = offset
      this.name = buffer.toString('ascii', offset, 8)
      offset = offset + 8
      this.misc = buffer.readUInt32LE() // PhysicalAddress;  VirtualSize
      offset = offset + 4

      this.virtualAddress = buffer.readUInt32LE()
      offset = offset + 4
      this.sizeOfRawData = buffer.readUInt32LE()
      offset = offset + 4
      this.pointerToRawData = buffer.readUInt32LE()
      offset = offset + 4
      this.pointerToRelocations = buffer.readUInt32LE()
      offset = offset + 4
      this.pointerToLinenumbers = buffer.readUInt32LE()
      offset = offset + 4

      this.numberOfRelocations = buffer.readUInt16LE()
      offset = offset + 2
      this.numberOfLinenumbers = buffer.readUInt16LE()
      offset = offset + 2
      this.characteristics = buffer.readUInt32LE()
      offset = offset + 4
      this.length = offset - this.startOffset
    }
  }

  class PEReader {
    constructor (filePath) {
      var buffer = fs.readFileSync(filePath)
      // header imformationddd
      this.dosHeader = new DosHeader(buffer)
      var stubLen = this.dosHeader.length + this.dosHeader.offset / 8
      this.dosStub = buffer.toString('ascii', this.dosHeader.length, stubLen)
      this.peHeader = new PEHeader(buffer, stubLen)
      this.sectionHeader = new SectionHeader(buffer, offset)
    //
    }
  }

  export default PEReader
  module.exports.PEReader = PEReader

  export { DosHeader, FileHeader, OptionalHeader, PEHeader, PEReader, SectionHeader }
