"use client";

import React, { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { industriesService } from "@/lib/admin/services/industries.service";
import { Button } from "@voryent/ui";
import { Star, Archive, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from "lucide-react";

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 }
};

const renderIndustryIcon = (iconName: string, className: string = '') => {
  const IconComponent = (Icons as any)[iconName || 'Building2'] || Icons.Building2;
  return <IconComponent className={className} />;
};

export default function IndustriesPage() {
  const queryClient = useQueryClient();
  const { data: industries = [], isLoading } = useQuery({
    queryKey: ["industries"],
    queryFn: () => industriesService.getAll(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: { status?: string, featured?: boolean } }) => 
      industriesService.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["industries"] });
    },
  });

  const sortedIndustries = useMemo(() => {
    return [...industries].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [industries]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-md">
        <p className="text-muted-foreground">Loading industries...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">industries</h1>
          <p className="text-muted-foreground">Manage visibility of your hardcoded industries.</p>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {sortedIndustries.map((industry: any, index: number) => (
            <motion.div
              key={industry.id}
              variants={scale}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border h-full flex flex-col">
                <div className="relative h-40">
                  <img
                    src={industry.coverImage || 'https://via.placeholder.com/400x160?text=industry+Image'}
                    alt={industry.title}
                    className="w-full h-full object-cover"
                  />
                  {industry.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3" /> Featured
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {renderIndustryIcon(industry.icon, 'w-5 h-5')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {industry.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Slug: {industry.slug}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-2">
                    {industry.shortDescription || industry.fullOverview}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(industry.technologies || []).slice(0, 3).map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {(industry.technologies || []).length > 3 && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                        +{(industry.technologies || []).length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant={industry.status === 'Archived' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => updateMutation.mutate({ 
                        id: industry.id, 
                        data: { status: industry.status === 'Archived' ? 'Published' : 'Archived' }
                      })}
                      disabled={updateMutation.isPending}
                    >
                      {industry.status === 'Archived' ? <CheckCircle className="w-4 h-4 mr-2" /> : <Archive className="w-4 h-4 mr-2" />}
                      {industry.status === 'Archived' ? 'Publish' : 'Archive'}
                    </Button>
                    <Button
                      variant={industry.featured ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => updateMutation.mutate({ 
                        id: industry.id, 
                        data: { featured: !industry.featured }
                      })}
                      disabled={updateMutation.isPending}
                    >
                      <Star className="w-4 h-4 mr-2" /> 
                      {industry.featured ? 'Unfeature' : 'Feature'}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {industries.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🛠️</div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No industries Yet
          </h3>
          <p className="text-muted-foreground mb-6">
            industries will appear here automatically from the codebase.
          </p>
        </motion.div>
      )}
    </div>
  );
}



