/* eslint-disable */

'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Upload } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CreativeStep({ creative, setCreative, imagePreview, handleImageUpload, prevTab, submitAll }: any) {
  return (
    <Card className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Create Ad Creative</h2>

      <div className="space-y-6">
        <div>
          <Label>Creative Name</Label>
          <Input value={creative.name} onChange={(e) => setCreative({ ...creative, name: e.target.value })} />
        </div>

        <div>
          <Label>Upload Image</Label>
          <div className="border-2 border-dashed p-6 rounded text-center">
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
            {imagePreview && <img src={imagePreview} className="max-w-sm mx-auto mt-4 rounded" />}
          </div>
        </div>

        <div>
          <Label>Headline</Label>
          <Input value={creative.headline} onChange={(e) => setCreative({ ...creative, headline: e.target.value })} />
        </div>

        <div>
          <Label>Primary Text</Label>
          <textarea className="w-full border p-3 rounded" value={creative.primaryText}
            onChange={(e) => setCreative({ ...creative, primaryText: e.target.value })} />
        </div>

        <div>
          <Label>Call to Action</Label>
          <Select value={creative.callToAction} onValueChange={(v) => setCreative({ ...creative, callToAction: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="LEARN_MORE">Learn More</SelectItem>
              <SelectItem value="SHOP_NOW">Shop Now</SelectItem>
              <SelectItem value="SIGN_UP">Sign Up</SelectItem>
              <SelectItem value="DOWNLOAD">Download</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={prevTab}>
          <ChevronLeft className="mr-2" /> Back
        </Button>

        <Button size="lg" onClick={submitAll}>
          <Upload className="mr-2" /> Create Full Campaign
        </Button>
      </div>
    </Card>
  );
}
