/* eslint-disable */

'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AdSetStep({ adSet, setAdSet, nextTab, prevTab }: any) {
  return (
    <Card className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Create Ad Set</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Ad Set Name</Label>
          <Input value={adSet.name} onChange={(e) => setAdSet({ ...adSet, name: e.target.value })} />
        </div>

        <div>
          <Label>Daily Budget</Label>
          <Input type="number" value={adSet.dailyBudget} onChange={(e) => setAdSet({ ...adSet, dailyBudget: Number(e.target.value) })} />
        </div>

        <div>
          <Label>Start Date</Label>
          <Input type="datetime-local" value={adSet.startDate} onChange={(e) => setAdSet({ ...adSet, startDate: e.target.value })} />
        </div>

        <div>
          <Label>End Date</Label>
          <Input type="datetime-local" value={adSet.endDate} onChange={(e) => setAdSet({ ...adSet, endDate: e.target.value })} />
        </div>

        <div>
          <Label>Locations</Label>
          <Input
            value={adSet.targeting.locations.join(', ')}
            onChange={(e) =>
              setAdSet({
                ...adSet,
                targeting: { ...adSet.targeting, locations: e.target.value.split(',').map(s => s.trim()) }
              })
            }
          />
        </div>

        <div className="flex gap-4">
          <div>
            <Label>Age Min</Label>
            <Input type="number" value={adSet.targeting.ageMin} onChange={(e) =>
              setAdSet({ ...adSet, targeting: { ...adSet.targeting, ageMin: Number(e.target.value) } })
            } />
          </div>

          <div>
            <Label>Age Max</Label>
            <Input type="number" value={adSet.targeting.ageMax} onChange={(e) =>
              setAdSet({ ...adSet, targeting: { ...adSet.targeting, ageMax: Number(e.target.value) } })
            } />
          </div>
        </div>

        <div>
          <Label>Gender</Label>
          <Select onValueChange={(v) =>
            setAdSet({
              ...adSet,
              targeting: { ...adSet.targeting, gender: v === 'all' ? undefined : Number(v) }
            })
          }>
            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="1">Male</SelectItem>
              <SelectItem value="2">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={prevTab}>
          <ChevronLeft className="mr-2" /> Back
        </Button>

        <Button onClick={nextTab}>
          Next: Creative <ChevronRight className="ml-2" />
        </Button>
      </div>
    </Card>
  );
}
