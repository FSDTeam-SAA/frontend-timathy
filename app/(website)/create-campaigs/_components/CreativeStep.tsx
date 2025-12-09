// // /* eslint-disable */
// // 'use client';

// // import { useRef, useState } from "react";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Button } from "@/components/ui/button";
// // import { Card } from "@/components/ui/card";
// // import { ChevronLeft, Upload, Sparkles, X } from "lucide-react";
// // import { useSession } from "next-auth/react";
// // import { useMutation } from "@tanstack/react-query";
// // import { toast } from "sonner";
// // import { CreativeData } from "./MainPage";

// // interface CreativeStepProps {
// //   creative: CreativeData;
// //   setCreative: React.Dispatch<React.SetStateAction<CreativeData>>;
// //   prevTab: () => void;
// //   pageId: string;
// //   adAccountId: string;
// //   adSetId: string;
// // }

// // export default function CreativeStep({
// //   creative,
// //   setCreative,
// //   prevTab,
// //   pageId,
// //   adAccountId,
// //   adSetId,
// // }: CreativeStepProps) {
// //   const inputRef = useRef<HTMLInputElement>(null);
// //   const { data: session } = useSession();
// //   const token = (session?.user as any)?.accessToken;

// //   const [creativeCreated, setCreativeCreated] = useState(false);
// //   const [createdCreativeId, setCreatedCreativeId] = useState<string | null>(null);

// //   const inputStyle =
// //     "border border-[#4B4B4B] h-12 rounded-[8px] bg-[#4B4B4B] text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#FF6900]";

// //   const handleFileSelect = () => inputRef.current?.click();

// //   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setCreative((prev) => ({ ...prev, file, preview: reader.result as string }));
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const removeFile = () => {
// //     setCreative((prev) => ({ ...prev, file: null, preview: null }));
// //   };

// //   const generateAdMutation = useMutation({
// //     mutationFn: async (url: string) => {
// //       if (!url) throw new Error("Please enter a website URL");
// //       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/ai/generate-ad`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({ url }),
// //       });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.error || "AI generation failed");
// //       return data;
// //     },
// //     onSuccess: (data) => {
// //       setCreative((prev) => ({
// //         ...prev,
// //         headline: data.adData?.adCreative?.headline || data.crawledData?.headings?.[0] || "Grab This Deal Now!",
// //         primaryText: data.adData?.adCreative?.primaryText || "Limited time offer – don't miss out!",
// //       }));
// //       toast.success("AI ad copy generated successfully!");
// //     },
// //     onError: (err: any) => toast.error(err.message || "Failed to generate ad copy"),
// //   });

// //   const createCreativeMutation = useMutation({
// //     mutationFn: async () => {
// //       if (!creative.file) throw new Error("Please upload an image or video");
// //       if (!creative.name || !creative.headline || !creative.primaryText || !creative.destinationUrl)
// //         throw new Error("Please fill all required fields");

// //       const formData = new FormData();
// //       formData.append("adAccountId", adAccountId);
// //       formData.append("pageId", pageId);
// //       formData.append("adSetId", adSetId);
// //       formData.append("ads", creative.file, creative.file.name);

// //       const adCreative = {
// //         name: creative.name,
// //         headline: creative.headline,
// //         primaryText: creative.primaryText,
// //         format: creative.format,
// //         destinationUrl: creative.destinationUrl,
// //         callToAction: creative.callToAction || "LEARN_MORE",
// //       };
// //       formData.append("adCreative", JSON.stringify(adCreative));

// //       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/final/create-creativeAd`, {
// //         method: "POST",
// //         headers: { Authorization: `Bearer ${token}` },
// //         body: formData,
// //       });

// //       const result = await res.json();
// //       if (!res.ok) {
// //         const errorMsg = result?.detail?.error?.message || result?.error || "Failed to create ad";
// //         throw new Error(errorMsg);
// //       }
// //       return result;
// //     },
// //     onMutate: () => toast.loading("Creating your ad creative..."),
// //     onSuccess: (result) => {
// //       toast.dismiss();
// //       const id = result.creativeId || result.id;
// //       setCreatedCreativeId(id);
// //       setCreativeCreated(true);

// //       toast.success("Ad Creative Created Successfully!", {
// //         description: (
// //         <div className="space-y-1 text-sm">
// //           <p>Creative ID: <code className="bg-gray-800 px-2 py-1 rounded">{id}</code></p>
// //           {result.name && <p>Name: {result.name}</p>}
// //         </div>
// //       ),
// //       duration: 12000,
// //       });
// //     },
// //     onError: (err: any) => {
// //       toast.dismiss();
// //       toast.error(err.message || "Failed to create creative");
// //     },
// //   });

// //   const publishMutation = useMutation({
// //     mutationFn: async () => {
// //       if (!createdCreativeId) throw new Error("Creative not created yet");

// //       const payload = {
// //         adCreativeId: createdCreativeId,
// //         adSetId: adSetId,
// //         adAccountId: adAccountId,
// //         pageId: pageId,
// //       };

// //       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/ai/final-post`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify(payload),
// //       });

// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.error || "Failed to publish ad");
// //       return data;
// //     },
// //     onMutate: () => toast.loading("Publishing your ad..."),
// //     onSuccess: () => {
// //       toast.dismiss();
// //       toast.success("Ad Published Successfully!", {
// //         description: "Your ad is now live on Facebook!",
// //         duration: 8000,
// //       });
// //     },
// //     onError: (err: any) => {
// //       toast.dismiss();
// //       toast.error(err.message || "Failed to publish ad");
// //     },
// //   });

// //   return (
// //     <Card className="p-4 sm:p-6 lg:p-8 bg-[#2A2A2A] border-[#4B4B4B] mx-auto max-w-5xl">
// //       <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-white text-center sm:text-left">
// //         Create Ad Creative
// //       </h2>

// //       <div className="space-y-6 lg:space-y-8">
// //         {/* Creative Name */}
// //         <div>
// //           <Label className="text-white text-sm sm:text-base">Creative Name</Label>
// //           <Input
// //             value={creative.name}
// //             onChange={(e) => setCreative((prev) => ({ ...prev, name: e.target.value }))}
// //             placeholder="e.g. Summer Sale 2025"
// //             className={inputStyle}
// //           />
// //         </div>

// //         {/* Website URL + AI Generate */}
// //         <div>
// //           <Label className="text-white text-sm sm:text-sm sm:text-base">Website URL (for AI generation)</Label>
// //           <div className="flex flex-col sm:flex-row gap-3">
// //             <Input
// //               value={creative.websiteUrl || ""}
// //               onChange={(e) => setCreative((prev) => ({ ...prev, websiteUrl: e.target.value }))}
// //               placeholder="https://yourwebsite.com"
// //               className={inputStyle + " flex-1"}
// //             />
// //             <Button
// //               onClick={() => generateAdMutation.mutate(creative.websiteUrl || "")}
// //               disabled={generateAdMutation.isPending || !creative.websiteUrl}
// //               className="bg-[#FF6900] hover:bg-[#e85e00] h-12 px-4 sm:px-6 rounded-[8px] w-full sm:w-auto"
// //             >
// //               {generateAdMutation.isPending ? "Generating..." : (
// //                 <>
// //                   <Sparkles className="mr-2 h-5 w-5" />
// //                   Generate by AI
// //                 </>
// //               )}
// //             </Button>
// //           </div>
// //         </div>

// //         {/* Media Upload */}
// //         <div>
// //           <Label className="text-white text-sm sm:text-base">
// //             Upload {creative.format === "VIDEO" ? "Video" : "Image"}
// //           </Label>
// //           <input
// //             type="file"
// //             accept={creative.format === "VIDEO" ? "video/*" : "image/*"}
// //             ref={inputRef}
// //             onChange={handleFileUpload}
// //             className="hidden"
// //           />

// //           {!creative.preview ? (
// //             <div
// //               onClick={handleFileSelect}
// //               className="cursor-pointer border-2 border-dashed border-gray-500 p-8 sm:p-12 rounded-lg text-center bg-[#3A3A3A] hover:bg-[#4B4B4B] transition-colors"
// //             >
// //               <Upload className="mx-auto mb-4 h-10 w-10 text-[#FF6900]" />
// //               <p className="text-white text-sm sm:text-base">
// //                 Click to upload {creative.format === "VIDEO" ? "video" : "image"}
// //               </p>
// //             </div>
// //           ) : (
// //             <div className="relative max-w-full mx-auto">
// //               {creative.format === "VIDEO" ? (
// //                 <video
// //                   src={creative.preview}
// //                   controls
// //                   className="rounded-lg shadow-lg w-full max-h-96 object-contain bg-black"
// //                 />
// //               ) : (
// //                 <img
// //                   src={creative.preview}
// //                   alt="Preview"
// //                   className="rounded-lg shadow-lg w-full max-h-96 object-contain"
// //                 />
// //               )}
// //               <button
// //                 onClick={removeFile}
// //                 className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white rounded-full p-2 transition"
// //               >
// //                 <X className="h-5 w-5" />
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         {/* Ad Format */}
// //         <div>
// //           <Label className="text-white text-sm sm:text-base">Ad Format</Label>
// //           <Select
// //             value={creative.format}
// //             onValueChange={(v: "SINGLE_IMAGE" | "VIDEO") =>
// //               setCreative((prev) => ({ ...prev, format: v, file: null, preview: null }))
// //             }
// //           >
// //             <SelectTrigger className={inputStyle}>
// //               <SelectValue />
// //             </SelectTrigger>
// //             <SelectContent className="bg-[#3A3A3A] text-white border-[#4B4B4B]">
// //               <SelectItem value="SINGLE_IMAGE">Single Image</SelectItem>
// //               <SelectItem value="VIDEO">Video</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>

// //         {/* Headline */}
// //         <div>
// //           <Label className="text-white text-sm sm:text-base">Headline</Label>
// //           <Input
// //             value={creative.headline}
// //             onChange={(e) => setCreative((prev) => ({ ...prev, headline: e.target.value }))}
// //             placeholder="e.g. 50% Off Everything!"
// //             className={inputStyle}
// //           />
// //         </div>

// //         {/* Primary Text */}
// //         <div>
// //           <Label className="text-white text-sm sm:text-base">Primary Text</Label>
// //           <textarea
// //             rows={5}
// //             value={creative.primaryText}
// //             onChange={(e) => setCreative((prev) => ({ ...prev, primaryText: e.target.value }))}
// //             placeholder="Write an engaging ad message that grabs attention..."
// //             className="w-full border border-[#4B4B4B] bg-[#4B4B4B] text-white p-4 rounded-[8px] outline-none placeholder:text-gray-400 text-sm sm:text-base resize-none"
// //           />
// //         </div>

// //         {/* Destination URL */}
// //         <div>
// //           <Label className="text-white text-sm sm:text-base">Destination URL</Label>
// //           <Input
// //             value={creative.destinationUrl}
// //             onChange={(e) => setCreative((prev) => ({ ...prev, destinationUrl: e.target.value }))}
// //             placeholder="https://yourwebsite.com/offer"
// //             className={inputStyle}
// //           />
// //         </div>
// //       </div>

// //       {/* Action Buttons - Responsive */}
// //       <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-between gap-4">
// //         <Button
// //           variant="outline"
// //           onClick={prevTab}
// //           className="border-white text-white hover:bg-[#FF6900]/10 h-12 rounded-[8px] order-2 sm:order-1"
// //         >
// //           <ChevronLeft className="mr-2 h-5 w-5" /> Back
// //         </Button>

// //         <div className="flex flex-col sm:flex-row gap-4 order-1 sm:order-2 w-full sm:w-auto">
// //           <Button
// //             onClick={() => createCreativeMutation.mutate()}
// //             disabled={createCreativeMutation.isPending}
// //             className="bg-[#FF6900] hover:bg-[#e85e00] h-12 px-8 rounded-[8px] w-full sm:w-auto"
// //           >
// //             {createCreativeMutation.isPending ? "Creating..." : "Add Creative"}
// //           </Button>

// //           <Button
// //             onClick={() => publishMutation.mutate()}
// //             disabled={!creativeCreated || publishMutation.isPending}
// //             className={`
// //               h-12 px-8 rounded-[8px] flex items-center justify-center transition-all w-full sm:w-auto
// //               ${creativeCreated
// //                 ? "bg-[#00D4FF] hover:bg-[#00b8e6] text-white"
// //                 : "bg-gray-600 text-gray-400 cursor-not-allowed"
// //               }
// //             `}
// //           >
// //             <Upload className="mr-2 h-5 w-5" />
// //             {publishMutation.isPending ? "Publishing..." : "Publish"}
// //           </Button>
// //         </div>
// //       </div>
// //     </Card>
// //   );
// // }


// /* eslint-disable */
// 'use client';
// import { useRef, useState, useCallback } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { ChevronLeft, Upload, Sparkles, X, Crop } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "sonner";
// import Cropper from "react-easy-crop";
// import { CreativeData } from "./MainPage";

// interface CreativeStepProps {
//   creative: CreativeData;
//   setCreative: React.Dispatch<React.SetStateAction<CreativeData>>;
//   prevTab: () => void;
//   pageId: string;
//   adAccountId: string;
//   adSetId: string;
// }

// export default function CreativeStep({
//   creative,
//   setCreative,
//   prevTab,
//   pageId,
//   adAccountId,
//   adSetId,
// }: CreativeStepProps) {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const { data: session } = useSession();
//   const token = (session?.user as any)?.accessToken;
//   const [creativeCreated, setCreativeCreated] = useState(false);
//   const [createdCreativeId, setCreatedCreativeId] = useState<string | null>(null);

//   // Cropper state (only for images)
//   const [showCropper, setShowCropper] = useState(false);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

//   const inputStyle =
//     "border border-[#4B4B4B] h-12 rounded-[8px] bg-[#4B4B4B] text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#FF6900]";

//   const handleFileSelect = () => inputRef.current?.click();

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const preview = reader.result as string;

//       if (file.type.startsWith("image/")) {
//         setCreative((prev) => ({
//           ...prev,
//           file,
//           preview,
//           format: "SINGLE_IMAGE",
//         }));
//         setShowCropper(true); // Open cropper for images
//       } else if (file.type.startsWith("video/")) {
//         setCreative((prev) => ({
//           ...prev,
//           file,
//           preview,
//           format: "VIDEO",
//         }));
//         setShowCropper(false);
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const removeFile = () => {
//     setCreative((prev) => ({ ...prev, file: null, preview: null }));
//     setShowCropper(false);
//   };

//   // Crop completed → convert to Blob and save
//   const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<Blob> => {
//     const image = new Image();
//     image.src = imageSrc;
//     await new Promise((resolve) => (image.onload = resolve));

//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d")!;

//     canvas.width = pixelCrop.width;
//     canvas.height = pixelCrop.height;

//     ctx.drawImage(
//       image,
//       pixelCrop.x,
//       pixelCrop.y,
//       pixelCrop.width,
//       pixelCrop.height,
//       0,
//       0,
//       pixelCrop.width,
//       pixelCrop.height
//     );

//     return new Promise((resolve) => {
//       canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.95);
//     });
//   };

//   const applyCrop = async () => {
//     if (!creative.preview || !croppedAreaPixels) return;

//     try {
//       const croppedBlob = await getCroppedImg(creative.preview, croppedAreaPixels);
//       const croppedFile = new File([croppedBlob], creative.file?.name || "cropped.jpg", {
//         type: croppedBlob.type,
//       });

//       const croppedPreview = URL.createObjectURL(croppedBlob);

//       setCreative((prev) => ({
//         ...prev,
//         file: croppedFile,
//         preview: croppedPreview,
//       }));
//       setShowCropper(false);
//       toast.success("Image cropped successfully!");
//     } catch (err) {
//       toast.error("Failed to crop image");
//     }
//   };

//   // Rest of your mutations (unchanged)
//   const generateAdMutation = useMutation({
//     mutationFn: async (url: string) => {
//       if (!url) throw new Error("Please enter a website URL");
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/ai/generate-ad`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ url }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "AI generation failed");
//       return data;
//     },
//     onSuccess: (data) => {
//       setCreative((prev) => ({
//         ...prev,
//         headline: data.adData?.adCreative?.headline || data.crawledData?.headings?.[0] || "Grab This Deal Now!",
//         primaryText: data.adData?.adCreative?.primaryText || "Limited time offer – don't miss out!",
//       }));
//       toast.success("AI ad copy generated successfully!");
//     },
//     onError: (err: any) => toast.error(err.message || "Failed to generate ad copy"),
//   });

//   const createCreativeMutation = useMutation({
//     mutationFn: async () => {
//       if (!creative.file) throw new Error("Please upload an image or video");
//       if (!creative.name || !creative.headline || !creative.primaryText || !creative.destinationUrl)
//         throw new Error("Please fill all required fields");

//       const formData = new FormData();
//       formData.append("adAccountId", adAccountId);
//       formData.append("pageId", pageId);
//       formData.append("adSetId", adSetId);
//       formData.append("ads", creative.file, creative.file.name);

//       const adCreative = {
//         name: creative.name,
//         headline: creative.headline,
//         primaryText: creative.primaryText,
//         format: creative.format,
//         destinationUrl: creative.destinationUrl,
//         callToAction: creative.callToAction || "LEARN_MORE",
//       };
//       formData.append("adCreative", JSON.stringify(adCreative));

//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/final/create-creativeAd`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });
//       const result = await res.json();
//       if (!res.ok) {
//         const errorMsg = result?.detail?.error?.message || result?.error || "Failed to create ad";
//         throw new Error(errorMsg);
//       }
//       return result;
//     },
//     onMutate: () => toast.loading("Creating your ad creative..."),
//     onSuccess: (result) => {
//       toast.dismiss();
//       const id = result.creativeId || result.id;
//       setCreatedCreativeId(id);
//       setCreativeCreated(true);
//       toast.success("Ad Creative Created Successfully!", {
//         description: (
//           <div className="space-y-1 text-sm">
//             <p>Creative ID: <code className="bg-gray-800 px-2 py-1 rounded">{id}</code></p>
//             {result.name && <p>Name: {result.name}</p>}
//           </div>
//         ),
//         duration: 12000,
//       });
//     },
//     onError: (err: any) => {
//       toast.dismiss();
//       toast.error(err.message || "Failed to create creative");
//     },
//   });

//   const publishMutation = useMutation({
//     mutationFn: async () => {
//       if (!createdCreativeId) throw new Error("Creative not created yet");
//       const payload = {
//         adCreativeId: createdCreativeId,
//         adSetId: adSetId,
//         adAccountId: adAccountId,
//         pageId: pageId,
//       };
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/ai/final-post`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to publish ad");
//       return data;
//     },
//     onMutate: () => toast.loading("Publishing your ad..."),
//     onSuccess: () => {
//       toast.dismiss();
//       toast.success("Ad Published Successfully!", {
//         description: "Your ad is now live on Facebook!",
//         duration: 8000,
//       });
//     },
//     onError: (err: any) => {
//       toast.dismiss();
//       toast.error(err.message || "Failed to publish ad");
//     },
//   });

//   return (
//     <Card className="p-4 sm:p-6 lg:p-8 bg-[#2A2A2A] border-[#4B4B4B] mx-auto max-w-5xl">
//       <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-white text-center sm:text-left">
//         Create Ad Creative
//       </h2>

//       <div className="space-y-6 lg:space-y-8">
//         {/* Creative Name */}
//         <div>
//           <Label className="text-white text-sm sm:text-base">Creative Name</Label>
//           <Input
//             value={creative.name}
//             onChange={(e) => setCreative((prev) => ({ ...prev, name: e.target.value }))}
//             placeholder="e.g. Summer Sale 2025"
//             className={inputStyle}
//           />
//         </div>

//         {/* Website URL + AI Generate */}
//         <div>
//           <Label className="text-white text-sm sm:text-base">Website URL (for AI generation)</Label>
//           <div className="flex flex-col sm:flex-row gap-3">
//             <Input
//               value={creative.websiteUrl || ""}
//               onChange={(e) => setCreative((prev) => ({ ...prev, websiteUrl: e.target.value }))}
//               placeholder="https://yourwebsite.com"
//               className={inputStyle + " flex-1"}
//             />
//             <Button
//               onClick={() => generateAdMutation.mutate(creative.websiteUrl || "")}
//               disabled={generateAdMutation.isPending || !creative.websiteUrl}
//               className="bg-[#FF6900] hover:bg-[#e85e00] h-12 px-4 sm:px-6 rounded-[8px] w-full sm:w-auto"
//             >
//               {generateAdMutation.isPending ? "Generating..." : (
//                 <>
//                   <Sparkles className="mr-2 h-5 w-5" />
//                   Generate by AI
//                 </>
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Media Upload */}
//         <div>
//           <Label className="text-white text-sm sm:text-base">
//             Upload {creative.format === "VIDEO" ? "Video" : "Image"}
//           </Label>
//           <input
//             type="file"
//             accept="image/*,video/*"
//             ref={inputRef}
//             onChange={handleFileUpload}
//             className="hidden"
//           />

//           {/* Upload Box */}
//           {!creative.preview ? (
//             <div
//               onClick={handleFileSelect}
//               className="cursor-pointer border-2 border-dashed border-gray-500 p-8 sm:p-12 rounded-lg text-center bg-[#3A3A3A] hover:bg-[#4B4B4B] transition-colors"
//             >
//               <Upload className="mx-auto mb-4 h-10 w-10 text-[#FF6900]" />
//               <p className="text-white text-sm sm:text-base">
//                 Click to upload image or video
//               </p>
//             </div>
//           ) : null}

//           {/* Image Cropper Modal */}
//           {showCropper && creative.preview && creative.format === "SINGLE_IMAGE" && (
//             <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
//               <div className="flex-1 relative">
//                 <Cropper
//                   image={creative.preview}
//                   crop={crop}
//                   zoom={zoom}
//                   aspect={1.91 / 1} // Facebook recommended 1.91:1
//                   onCropChange={setCrop}
//                   onZoomChange={setZoom}
//                   onCropComplete={onCropComplete}
//                 />
//               </div>
//               <div className="p-4 bg-[#2A2A2A] flex justify-between gap-4">
//                 <Button variant="outline" onClick={() => { setShowCropper(false); removeFile(); }}>
//                   Cancel
//                 </Button>
//                 <Button onClick={applyCrop} className="bg-[#FF6900] hover:bg-[#e85e00]">
//                   <Crop className="mr-2 h-5 w-5" /> Apply Crop
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* Preview (after crop or video) */}
//           {creative.preview && !showCropper && (
//             <div className="relative max-w-full mx-auto">
//               {creative.format === "VIDEO" ? (
//                 <video
//                   src={creative.preview}
//                   controls
//                   className="rounded-lg shadow-lg w-full max-h-96 object-contain bg-black"
//                 />
//               ) : (
//                 <img
//                   src={creative.preview}
//                   alt="Preview"
//                   className="rounded-lg shadow-lg w-full max-h-96 object-contain"
//                 />
//               )}
//               <button
//                 onClick={removeFile}
//                 className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white rounded-full p-2 transition"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Ad Format */}
//         <div>
//           <Label className="text-white text-sm sm:text-base">Ad Format</Label>
//           <Select
//             value={creative.format}
//             onValueChange={(v: "SINGLE_IMAGE" | "VIDEO") =>
//               setCreative((prev) => ({ ...prev, format: v, file: null, preview: null }))
//             }
//           >
//             <SelectTrigger className={inputStyle}>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent className="bg-[#3A3A3A] text-white border-[#4B4B4B]">
//               <SelectItem value="SINGLE_IMAGE">Single Image</SelectItem>
//               <SelectItem value="VIDEO">Video</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Headline */}
//         <div>
//           <Label className="text-white text-sm sm:text-base">Headline</Label>
//           <Input
//             value={creative.headline}
//             onChange={(e) => setCreative((prev) => ({ ...prev, headline: e.target.value }))}
//             placeholder="e.g. 50% Off Everything!"
//             className={inputStyle}
//           />
//         </div>

//         {/* Primary Text */}
//         <div>
//           <Label className="text-white text-sm sm:text-base">Primary Text</Label>
//           <textarea
//             rows={5}
//             value={creative.primaryText}
//             onChange={(e) => setCreative((prev) => ({ ...prev, primaryText: e.target.value }))}
//             placeholder="Write an engaging ad message that grabs attention..."
//             className="w-full border border-[#4B4B4B] bg-[#4B4B4B] text-white p-4 rounded-[8px] outline-none placeholder:text-gray-400 text-sm sm:text-base resize-none"
//           />
//         </div>

//         {/* Destination URL */}
//         <div>
//           <Label className="text-white text-sm sm:text-base">Destination URL</Label>
//           <Input
//             value={creative.destinationUrl}
//             onChange={(e) => setCreative((prev) => ({ ...prev, destinationUrl: e.target.value }))}
//             placeholder="https://yourwebsite.com/offer"
//             className={inputStyle}
//           />
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-between gap-4">
//         <Button
//           variant="outline"
//           onClick={prevTab}
//           className="border-white text-white hover:bg-[#FF6900]/10 h-12 rounded-[8px] order-2 sm:order-1"
//         >
//           <ChevronLeft className="mr-2 h-5 w-5" /> Back
//         </Button>
//         <div className="flex flex-col sm:flex-row gap-4 order-1 sm:order-2 w-full sm:w-auto">
//           <Button
//             onClick={() => createCreativeMutation.mutate()}
//             disabled={createCreativeMutation.isPending}
//             className="bg-[#FF6900] hover:bg-[#e85e00] h-12 px-8 rounded-[8px] w-full sm:w-auto"
//           >
//             {createCreativeMutation.isPending ? "Creating..." : "Add Creative"}
//           </Button>
//           <Button
//             onClick={() => publishMutation.mutate()}
//             disabled={!creativeCreated || publishMutation.isPending}
//             className={`
//               h-12 px-8 rounded-[8px] flex items-center justify-center transition-all w-full sm:w-auto
//               ${creativeCreated
//                 ? "bg-[#00D4FF] hover:bg-[#00b8e6] text-white"
//                 : "bg-gray-600 text-gray-400 cursor-not-allowed"
//               }
//             `}
//           >
//             <Upload className="mr-2 h-5 w-5" />
//             {publishMutation.isPending ? "Publishing..." : "Publish"}
//           </Button>
//         </div>
//       </div>
//     </Card>
//   );
// }



/* eslint-disable */
'use client';
import { useRef, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Upload, Sparkles, X, Crop } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ImageEditor from '@toast-ui/react-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css';
import { CreativeData } from "./MainPage";

interface CreativeStepProps {
  creative: CreativeData;
  setCreative: React.Dispatch<React.SetStateAction<CreativeData>>;
  prevTab: () => void;
  pageId: string;
  adAccountId: string;
  adSetId: string;
}

export default function CreativeStep({
  creative,
  setCreative,
  prevTab,
  pageId,
  adAccountId,
  adSetId,
}: CreativeStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);
  const { data: session } = useSession();
  const token = (session?.user as any)?.accessToken;
  const [creativeCreated, setCreativeCreated] = useState(false);
  const [createdCreativeId, setCreatedCreativeId] = useState<string | null>(null);

  // Editor state (only for images)
  const [showEditor, setShowEditor] = useState(false);

  const inputStyle =
    "border border-[#4B4B4B] h-12 rounded-[8px] bg-[#4B4B4B] text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#FF6900]";

  const handleFileSelect = () => inputRef.current?.click();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const preview = reader.result as string;

      if (file.type.startsWith("image/")) {
        setCreative((prev) => ({
          ...prev,
          file,
          preview,
          format: "SINGLE_IMAGE",
        }));
        setShowEditor(true); // Open editor for images
      } else if (file.type.startsWith("video/")) {
        setCreative((prev) => ({
          ...prev,
          file,
          preview,
          format: "VIDEO",
        }));
        setShowEditor(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setCreative((prev) => ({ ...prev, file: null, preview: null }));
    setShowEditor(false);
  };

  // Apply editor changes → convert to Blob and save
  const applyEdit = async () => {
    if (!creative.preview) return;

    try {
      const editorInstance = editorRef.current.getInstance();
      const dataUrl = editorInstance.toDataURL();
      const blob = await fetch(dataUrl).then((res) => res.blob());
      const editedFile = new File([blob], creative.file?.name || "edited.jpg", {
        type: blob.type,
      });

      setCreative((prev) => ({
        ...prev,
        file: editedFile,
        preview: dataUrl,
      }));
      setShowEditor(false);
      toast.success("Image edited successfully!");
    } catch (err) {
      toast.error("Failed to apply edits");
    }
  };

  // Rest of your mutations (unchanged)
  const generateAdMutation = useMutation({
    mutationFn: async (url: string) => {
      if (!url) throw new Error("Please enter a website URL");
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/ai/generate-ad`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "AI generation failed");
      return data;
    },
    onSuccess: (data) => {
      setCreative((prev) => ({
        ...prev,
        headline: data.adData?.adCreative?.headline || data.crawledData?.headings?.[0] || "Grab This Deal Now!",
        primaryText: data.adData?.adCreative?.primaryText || "Limited time offer – don't miss out!",
      }));
      toast.success("AI ad copy generated successfully!");
    },
    onError: (err: any) => toast.error(err.message || "Failed to generate ad copy"),
  });

  const createCreativeMutation = useMutation({
    mutationFn: async () => {
      if (!creative.file) throw new Error("Please upload an image or video");
      if (!creative.name || !creative.headline || !creative.primaryText || !creative.destinationUrl)
        throw new Error("Please fill all required fields");

      const formData = new FormData();
      formData.append("adAccountId", adAccountId);
      formData.append("pageId", pageId);
      formData.append("adSetId", adSetId);
      formData.append("ads", creative.file, creative.file.name);

      const adCreative = {
        name: creative.name,
        headline: creative.headline,
        primaryText: creative.primaryText,
        format: creative.format,
        destinationUrl: creative.destinationUrl,
        callToAction: creative.callToAction || "LEARN_MORE",
      };
      formData.append("adCreative", JSON.stringify(adCreative));

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/final/create-creativeAd`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) {
        const errorMsg = result?.detail?.error?.message || result?.error || "Failed to create ad";
        throw new Error(errorMsg);
      }
      return result;
    },
    onMutate: () => toast.loading("Creating your ad creative..."),
    onSuccess: (result) => {
      toast.dismiss();
      const id = result.creativeId || result.id;
      setCreatedCreativeId(id);
      setCreativeCreated(true);
      toast.success("Ad Creative Created Successfully!", {
        description: (
          <div className="space-y-1 text-sm">
            <p>Creative ID: <code className="bg-gray-800 px-2 py-1 rounded">{id}</code></p>
            {result.name && <p>Name: {result.name}</p>}
          </div>
        ),
        duration: 12000,
      });
    },
    onError: (err: any) => {
      toast.dismiss();
      toast.error(err.message || "Failed to create creative");
    },
  });

  const publishMutation = useMutation({
    mutationFn: async () => {
      if (!createdCreativeId) throw new Error("Creative not created yet");
      const payload = {
        adCreativeId: createdCreativeId,
        adSetId: adSetId,
        adAccountId: adAccountId,
        pageId: pageId,
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/ai/final-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to publish ad");
      return data;
    },
    onMutate: () => toast.loading("Publishing your ad..."),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Ad Published Successfully!", {
        description: "Your ad is now live on Facebook!",
        duration: 8000,
      });
    },
    onError: (err: any) => {
      toast.dismiss();
      toast.error(err.message || "Failed to publish ad");
    },
  });

  return (
    <Card className="p-4 sm:p-6 lg:p-8 bg-[#2A2A2A] border-[#4B4B4B] mx-auto max-w-5xl">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-white text-center sm:text-left">
        Create Ad Creative
      </h2>

      <div className="space-y-6 lg:space-y-8">
        {/* Creative Name */}
        <div>
          <Label className="text-white text-sm sm:text-base">Creative Name</Label>
          <Input
            value={creative.name}
            onChange={(e) => setCreative((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. Summer Sale 2025"
            className={inputStyle}
          />
        </div>

        {/* Website URL + AI Generate */}
        <div>
          <Label className="text-white text-sm sm:text-base">Website URL (for AI generation)</Label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              value={creative.websiteUrl || ""}
              onChange={(e) => setCreative((prev) => ({ ...prev, websiteUrl: e.target.value }))}
              placeholder="https://yourwebsite.com"
              className={inputStyle + " flex-1"}
            />
            <Button
              onClick={() => generateAdMutation.mutate(creative.websiteUrl || "")}
              disabled={generateAdMutation.isPending || !creative.websiteUrl}
              className="bg-[#FF6900] hover:bg-[#e85e00] h-12 px-4 sm:px-6 rounded-[8px] w-full sm:w-auto"
            >
              {generateAdMutation.isPending ? "Generating..." : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate by AI
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Media Upload */}
        <div>
          <Label className="text-white text-sm sm:text-base">
            Upload {creative.format === "VIDEO" ? "Video" : "Image"}
          </Label>
          <input
            type="file"
            accept="image/*,video/*"
            ref={inputRef}
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Upload Box */}
          {!creative.preview ? (
            <div
              onClick={handleFileSelect}
              className="cursor-pointer border-2 border-dashed border-gray-500 p-8 sm:p-12 rounded-lg text-center bg-[#3A3A3A] hover:bg-[#4B4B4B] transition-colors"
            >
              <Upload className="mx-auto mb-4 h-10 w-10 text-[#FF6900]" />
              <p className="text-white text-sm sm:text-base">
                Click to upload image or video
              </p>
            </div>
          ) : null}

          {/* Image Editor Modal */}
          {showEditor && creative.preview && creative.format === "SINGLE_IMAGE" && (
            <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
              <div className="flex-1 relative">
                <ImageEditor
                  ref={editorRef}
                  includeUI={{
                    loadImage: {
                      path: creative.preview,
                      name: 'SampleImage',
                    },
                    theme: {}, // You can customize theme here
                    menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'mask', 'filter'],
                    initMenu: 'filter',
                    uiSize: {
                      width: '100%',
                      height: '100%',
                    },
                    menuBarPosition: 'bottom',
                  }}
                  cssMaxHeight={500}
                  cssMaxWidth={700}
                  selectionStyle={{ cornerSize: 20, rotatingPointOffset: 70 }}
                  usageStatistics={false}
                />
              </div>
              <div className="p-4 bg-[#2A2A2A] flex justify-between gap-4">
                <Button variant="outline" onClick={() => { setShowEditor(false); removeFile(); }}>
                  Cancel
                </Button>
                <Button onClick={applyEdit} className="bg-[#FF6900] hover:bg-[#e85e00]">
                  <Crop className="mr-2 h-5 w-5" /> Apply Changes
                </Button>
              </div>
            </div>
          )}

          {/* Preview (after edit or video) */}
          {creative.preview && !showEditor && (
            <div className="relative max-w-full mx-auto">
              {creative.format === "VIDEO" ? (
                <video
                  src={creative.preview}
                  controls
                  className="rounded-lg shadow-lg w-full max-h-96 object-contain bg-black"
                />
              ) : (
                <img
                  src={creative.preview}
                  alt="Preview"
                  className="rounded-lg shadow-lg w-full max-h-96 object-contain"
                />
              )}
              <button
                onClick={removeFile}
                className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white rounded-full p-2 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Ad Format */}
        <div>
          <Label className="text-white text-sm sm:text-base">Ad Format</Label>
          <Select
            value={creative.format}
            onValueChange={(v: "SINGLE_IMAGE" | "VIDEO") =>
              setCreative((prev) => ({ ...prev, format: v, file: null, preview: null }))
            }
          >
            <SelectTrigger className={inputStyle}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#3A3A3A] text-white border-[#4B4B4B]">
              <SelectItem value="SINGLE_IMAGE">Single Image</SelectItem>
              <SelectItem value="VIDEO">Video</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Headline */}
        <div>
          <Label className="text-white text-sm sm:text-base">Headline</Label>
          <Input
            value={creative.headline}
            onChange={(e) => setCreative((prev) => ({ ...prev, headline: e.target.value }))}
            placeholder="e.g. 50% Off Everything!"
            className={inputStyle}
          />
        </div>

        {/* Primary Text */}
        <div>
          <Label className="text-white text-sm sm:text-base">Primary Text</Label>
          <textarea
            rows={5}
            value={creative.primaryText}
            onChange={(e) => setCreative((prev) => ({ ...prev, primaryText: e.target.value }))}
            placeholder="Write an engaging ad message that grabs attention..."
            className="w-full border border-[#4B4B4B] bg-[#4B4B4B] text-white p-4 rounded-[8px] outline-none placeholder:text-gray-400 text-sm sm:text-base resize-none"
          />
        </div>

        {/* Destination URL */}
        <div>
          <Label className="text-white text-sm sm:text-base">Destination URL</Label>
          <Input
            value={creative.destinationUrl}
            onChange={(e) => setCreative((prev) => ({ ...prev, destinationUrl: e.target.value }))}
            placeholder="https://yourwebsite.com/offer"
            className={inputStyle}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-between gap-4">
        <Button
          variant="outline"
          onClick={prevTab}
          className="border-white text-white hover:bg-[#FF6900]/10 h-12 rounded-[8px] order-2 sm:order-1"
        >
          <ChevronLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        <div className="flex flex-col sm:flex-row gap-4 order-1 sm:order-2 w-full sm:w-auto">
          <Button
            onClick={() => createCreativeMutation.mutate()}
            disabled={createCreativeMutation.isPending}
            className="bg-[#FF6900] hover:bg-[#e85e00] h-12 px-8 rounded-[8px] w-full sm:w-auto"
          >
            {createCreativeMutation.isPending ? "Creating..." : "Add Creative"}
          </Button>
          <Button
            onClick={() => publishMutation.mutate()}
            disabled={!creativeCreated || publishMutation.isPending}
            className={`
              h-12 px-8 rounded-[8px] flex items-center justify-center transition-all w-full sm:w-auto
              ${creativeCreated
                ? "bg-[#00D4FF] hover:bg-[#00b8e6] text-white"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            <Upload className="mr-2 h-5 w-5" />
            {publishMutation.isPending ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>
    </Card>
  );
}