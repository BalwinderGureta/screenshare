//
//  BroadcastPickerManager.m
//  ScreenShareApp
//
//  Created by Balwinder Singh on 26/4/2025.
//

#import "BroadcastPickerManager.h"
#import <ReplayKit/ReplayKit.h>

@implementation BroadcastPickerManager

RCT_EXPORT_MODULE(BroadcastPickerManager)

- (UIView *)view
{
    if (@available(iOS 12.0, *)) {
        RPSystemBroadcastPickerView *broadcastPicker = [[RPSystemBroadcastPickerView alloc] initWithFrame:CGRectMake(0, 0, 60, 60)];
        broadcastPicker.preferredExtension = @"com.yourcompany.ScreenShareApp.ScreenShareExtension"; // ✅ update this to match your extension's bundle ID
        broadcastPicker.showsMicrophoneButton = YES;
        return broadcastPicker;
    } else {
        return [[UIView alloc] init];
    }
}

@end
