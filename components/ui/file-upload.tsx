"use client"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Upload, 
  File, 
  X, 
  CheckCircle, 
  AlertCircle,
  FileText,
  FileImage
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onFileUpload: (file: File, content: string) => void
  onFileRemove: () => void
  isProcessing: boolean
  uploadedFile: File | null
  maxSize?: number // in MB
  acceptedTypes?: string[]
}

export function FileUpload({
  onFileUpload,
  onFileRemove,
  isProcessing,
  uploadedFile,
  maxSize = 10,
  acceptedTypes = ['.pdf', '.doc', '.docx', '.txt', '.md']
}: FileUploadProps) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null)
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError(`File size must be less than ${maxSize}MB`)
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError(`Please upload a valid document file (${acceptedTypes.join(', ')})`)
      } else {
        setError('Invalid file. Please try again.')
      }
      return
    }

    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    
    // Simulate file processing with progress
    setUploadProgress(0)
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 100)

    // Simulate content extraction (in real implementation, this would parse the actual file)
    setTimeout(() => {
      clearInterval(progressInterval)
      setUploadProgress(100)
      
      // Mock extracted content based on file type
      const mockContent = generateMockContent(file.name, file.type)
      onFileUpload(file, mockContent)
    }, 1500)
  }, [maxSize, acceptedTypes, onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md']
    },
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
    multiple: false
  })

  const generateMockContent = (fileName: string, fileType: string): string => {
    const projectName = fileName.split('.')[0].replace(/[-_]/g, ' ')
    
    return `Project Overview: ${projectName}

Executive Summary:
${projectName} is an innovative Web3 project that leverages blockchain technology to revolutionize the digital ecosystem. Our platform combines cutting-edge DeFi protocols with user-friendly interfaces to create seamless experiences for both novice and experienced crypto users.

Key Features:
- Decentralized governance system
- Advanced smart contract functionality  
- Cross-chain compatibility
- Enhanced security protocols
- Community-driven development

Technology Stack:
Built on Ethereum with Layer 2 scaling solutions, our platform utilizes state-of-the-art cryptographic methods to ensure maximum security and efficiency. The architecture supports high-throughput transactions while maintaining decentralization principles.

Market Opportunity:
The global DeFi market continues to expand rapidly, with increasing adoption from institutional and retail investors. ${projectName} is positioned to capture significant market share through innovative features and strategic partnerships.

Tokenomics:
Our native token serves multiple utilities within the ecosystem, including governance voting, staking rewards, and transaction fee discounts. The token distribution follows a fair launch model with community incentives.

Roadmap:
Q1 2024: Platform launch and initial features
Q2 2024: Advanced trading tools and analytics
Q3 2024: Cross-chain integration
Q4 2024: Mobile application and expanded partnerships

Team:
Our experienced team combines expertise in blockchain development, financial markets, and user experience design. With backgrounds from leading tech companies and successful crypto projects, we're well-positioned to execute our vision.

Community:
Building a strong, engaged community is central to our mission. We actively engage with users through social media, AMAs, and community governance proposals to ensure the platform evolves according to user needs.`
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />
      case 'doc':
      case 'docx':
        return <FileText className="h-8 w-8 text-blue-500" />
      case 'txt':
      case 'md':
        return <FileText className="h-8 w-8 text-gray-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  if (uploadedFile && !isProcessing) {
    return (
      <div className="border-2 border-dashed border-green-200 dark:border-green-800 rounded-lg p-6 bg-green-50 dark:bg-green-950/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-medium text-green-800 dark:text-green-200">
                {uploadedFile.name}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                Document processed successfully
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onFileRemove}
            className="text-green-600 hover:text-green-800 hover:bg-green-100 dark:hover:bg-green-900/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  if (isProcessing) {
    return (
      <div className="border-2 border-dashed border-primary/50 rounded-lg p-6 bg-primary/5">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Upload className="h-6 w-6 text-primary animate-pulse" />
          </div>
          <h3 className="font-medium mb-2">Processing Document...</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Extracting content and analyzing your project information
          </p>
          <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
          <p className="text-xs text-muted-foreground mt-2">{uploadProgress}% complete</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive 
            ? "border-primary bg-primary/5" 
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
          error && "border-destructive bg-destructive/5"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          <div className={cn(
            "inline-flex items-center justify-center w-12 h-12 rounded-full",
            error ? "bg-destructive/10" : "bg-muted"
          )}>
            {error ? (
              <AlertCircle className="h-6 w-6 text-destructive" />
            ) : (
              <Upload className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          
          <div>
            <h3 className="font-medium mb-1">
              {isDragActive ? "Drop your document here" : "Upload Project Document"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to upload PDF, Word, or text files
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Max file size: {maxSize}MB
            </p>
          </div>
          
          {!isDragActive && (
            <Button variant="outline" size="sm" type="button">
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
          )}
        </div>
      </div>
      
      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
      
      <div className="text-xs text-muted-foreground">
        <p className="font-medium mb-1">Supported formats:</p>
        <p>PDF documents, Word files (.doc, .docx), Text files (.txt), Markdown (.md)</p>
      </div>
    </div>
  )
}