"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, ImageIcon, TextIcon, BarChart3, Sparkles } from 'lucide-react';

// Define types for our data structure
type Creative = {
  type: 'image' | 'copy';
  url?: string;
  content?: string;
};

type Product = {
  id: string;
  productName: string;
  productImage: string;
  category: string;
  date: string;
  status: string;
  creatives: Creative[];
};

// Dummy data for previously created AI creatives
const dummyCreatives: Product[] = [
  {
    id: '1',
    productName: 'EcoFresh Water Bottle',
    productImage: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
    category: 'Eco-Friendly',
    date: '2023-10-15',
    status: 'completed',
    creatives: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1536939459926-301728717817' },
      { type: 'copy', content: 'Stay hydrated in style. EcoFresh bottles keep your drinks cold for 24 hours and hot for 12.' },
    ],
  },
  {
    id: '2',
    productName: 'SmartDesk Pro',
    productImage: 'https://images.unsplash.com/photo-1518655048521-f130df041f66',
    category: 'Office',
    date: '2023-10-10',
    status: 'completed',
    creatives: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705' },
      { type: 'copy', content: 'Transform your workspace with SmartDesk Pro. Adjustable height, wireless charging, and smart connectivity.' },
    ],
  },
  {
    id: '3',
    productName: 'SleepWell Pillow',
    productImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2',
    category: 'Home',
    date: '2023-10-05',
    status: 'completed',
    creatives: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1631379578550-7038263c4c6a' },
      { type: 'copy', content: 'Experience the perfect night\'s sleep with our memory foam pillow, designed for all sleeping positions.' },
    ],
  },
  {
    id: '4',
    productName: 'FitTrack Watch',
    productImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1',
    category: 'Fitness',
    date: '2023-09-28',
    status: 'completed',
    creatives: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0' },
      { type: 'copy', content: 'Track your fitness journey with precision. Heart rate, sleep quality, and workout metrics in one sleek device.' },
    ],
  },
];

// Function to fetch creatives from database (commented out for now)
// async function fetchCreatives() {
//   // This would be replaced with actual database fetch
//   // const creatives = await db.creatives.findMany({
//   //   where: { userId: session.user.id },
//   //   orderBy: { createdAt: 'desc' },
//   // });
//   // return creatives;
//   return dummyCreatives;
// }

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  // Use dummy data instead of actual fetch for now
  // const creatives = await fetchCreatives();
  const creatives = dummyCreatives;

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your AI-generated creatives</p>
        </div>
        <Link href="/submit">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Creatives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-blue-500 mr-3" />
              <span className="text-3xl font-bold">{creatives.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Images Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ImageIcon className="h-8 w-8 text-purple-500 mr-3" />
              <span className="text-3xl font-bold">{creatives.reduce((acc, item) => acc + item.creatives.filter(c => c.type === 'image').length, 0)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Copy Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TextIcon className="h-8 w-8 text-emerald-500 mr-3" />
              <span className="text-3xl font-bold">{creatives.reduce((acc, item) => acc + item.creatives.filter(c => c.type === 'copy').length, 0)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mt-8" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Creatives</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="copy">Copy</TabsTrigger>
          </TabsList>
          
          <div className="text-sm text-muted-foreground">
            Showing {creatives.length} items
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatives.map((creative) => (
              <Card key={creative.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image
                    src={creative.productImage}
                    alt={creative.productName}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{creative.productName}</CardTitle>
                    <Badge variant="outline" className="bg-blue-50">{creative.category}</Badge>
                  </div>
                  <CardDescription>Created on {new Date(creative.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    {creative.creatives.map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {item.type === 'image' ? <ImageIcon className="h-3 w-3 mr-1" /> : <TextIcon className="h-3 w-3 mr-1" />}
                        {item.type}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 flex justify-between">
                  <Button variant="ghost" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Download</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="images" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {creatives.flatMap((creative) => 
              creative.creatives
                .filter(item => item.type === 'image' && item.url)
                .map((image, idx) => (
                  <Card key={`${creative.id}-${idx}`} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={image.url as string}
                        alt={`${creative.productName} creative`}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <CardFooter className="p-2">
                      <p className="text-xs truncate w-full">{creative.productName}</p>
                    </CardFooter>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="copy" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {creatives.flatMap((creative) => 
              creative.creatives
                .filter(item => item.type === 'copy' && item.content)
                .map((copy, idx) => (
                  <Card key={`${creative.id}-${idx}`}>
                    <CardHeader>
                      <CardTitle className="text-lg">{creative.productName}</CardTitle>
                      <CardDescription>Copy #{idx+1}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{copy.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Copy Text</Button>
                    </CardFooter>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;