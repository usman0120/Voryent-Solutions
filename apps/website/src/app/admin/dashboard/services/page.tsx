"use client";

import React, { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesService } from "@/lib/admin/services/services.service";
import { Button } from "@voryent/ui";
import { Plus, Trash2, Edit, Star } from "lucide-react";
import Link from "next/link";
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

const renderServiceIcon = (iconName: string, className: string = '') => {
  const IconComponent = (Icons as any)[iconName || 'Code2'] || Icons.Code2;
  return <IconComponent className={className} />;
};

export default function ServicesPage() {
  const queryClient = useQueryClient();
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => servicesService.getAll(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => servicesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const sortedServices = useMemo(() => {
    return [...services].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [services]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-md">
        <p className="text-muted-foreground">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings.</p>
        </div>
        <Button asChild>
          <Link href="/admin/dashboard/services/create">
            <Plus className="mr-2 h-4 w-4" /> Add Service
          </Link>
        </Button>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {sortedServices.map((service: any, index: number) => (
            <motion.div
              key={service.id}
              variants={scale}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border h-full flex flex-col">
                <div className="relative h-40">
                  <img
                    src={service.imageUrl || 'https://via.placeholder.com/400x160?text=Service+Image'}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  {service.featured && (
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
                      {renderServiceIcon(service.icon, 'w-5 h-5')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {service.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Slug: {service.slug}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-2">
                    {service.tagline || service.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(service.technologies || []).slice(0, 3).map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {(service.technologies || []).length > 3 && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                        +{(service.technologies || []).length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <Link href={`/admin/dashboard/services/${service.id}`}>
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDelete(service.id!)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {services.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🛠️</div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No Services Yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Start by adding your first service offering.
          </p>
          <Button asChild>
            <Link href="/admin/dashboard/services/create">
              <Plus className="mr-2 w-4 h-4" /> Add Your First Service
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
