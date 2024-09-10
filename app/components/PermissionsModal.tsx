import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function PermissionsModal({ isOpen, onClose, onConfirm }: PermissionsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-green-500">
        <DialogHeader>
          <DialogTitle className="text-green-300">Permissions Required</DialogTitle>
          <DialogDescription className="text-green-400">
            later.dog needs access to your X (Twitter) account to create your profile and enable matching.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h4 className="font-bold mb-2 text-green-300">We will access:</h4>
          <ul className="list-disc list-inside space-y-1 text-green-400">
            <li>Your public profile information</li>
            <li>Your username and display name</li>
            <li>Your profile picture</li>
          </ul>
          <p className="mt-4 text-green-400">
            We value your privacy and will never post without your permission.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline" className="bg-gray-700 text-green-400">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-green-600 text-white">
            Agree & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}