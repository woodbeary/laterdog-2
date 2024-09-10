import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function PermissionsModal({ isOpen, onClose, onConfirm }: PermissionsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-green-400 border-green-500">
        <DialogHeader>
          <DialogTitle className="text-green-300">Before You Connect</DialogTitle>
          <DialogDescription className="text-green-400">
            We value your privacy and want to be transparent about the data we use:
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ul className="list-disc pl-5 space-y-2">
            <li>We only access your public profile information (name and username).</li>
            <li>This data is used solely to create and personalize your later.dog profile.</li>
            <li>We do not share your information with any third parties.</li>
            <li>You can revoke access at any time from your account settings.</li>
          </ul>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="bg-gray-700 text-green-400 hover:bg-gray-600">Cancel</Button>
          <Button onClick={onConfirm} className="bg-green-600 text-white hover:bg-green-500">I Understand, Proceed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}